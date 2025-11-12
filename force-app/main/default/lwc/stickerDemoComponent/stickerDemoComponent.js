js --
import { LightningElement, api, track } from 'lwc';
//import createStickerBridge from '@salesforce/apex/RealTimeController.createStickerBridge';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
 
export default class StickerDemoComponent extends LightningElement {
    @api recordId;
    @track stickerName = '';
    @track selectedStream = '';
    @track valueStreamOptions = [];
    @track fileData = null;
    @track showSuccessCheck = false;
    @track showErrorMessage = false;
    @track errorMessage = '';
    @track isCompressing = false;
    @track isGlobal = false;
    isSaving = false;
 
    // Max base64 size to stay under 4MB Aura limit (with JSON overhead)
    MAX_BASE64_SIZE = 20 * 1024; // 2.5 MB base64 = ~1.9 MB file
 
    connectedCallback() {
        this.valueStreamOptions = [{ label: '-- None (Global Sticker) --', value: '' }];
        if (this.recordId) {
            this.valueStreamOptions.push({ label: 'This Value Stream', value: this.recordId });
            this.selectedStream = this.recordId;
        }
    }
 
    handleNameChange(event) {
        this.stickerName = event.target.value;
    }
 
    handleStreamChange(event) {
        this.selectedStream = event.detail.value;
    }
 
    // ✅ NEW: dynamic global toggle class
    get globalToggleClass() {
        return this.isGlobal ? 'global-toggle active' : 'global-toggle';
    }
 
    // ✅ NEW: dynamic global toggle label (fix for HTML ? : expression)
    get globalToggleLabel() {
        return this.isGlobal ? '🌍 Global Sticker' : '📌 This Value Stream Only';
    }
 
    // ✅ NEW: toggle logic to switch between global/local mode
    toggleGlobalSticker() {
        this.isGlobal = !this.isGlobal;
        this.selectedStream = this.isGlobal ? '' : this.recordId;
        console.log(
            this.isGlobal
                ? '🌍 Global Sticker Enabled (valueStreamId = null)'
                : '📌 Local Sticker Enabled (valueStreamId = ' + this.recordId + ')'
        );
    }
 
    // ✅ NEW: used by new HTML to open file dialog when clicking Browse button or box
    triggerFileDialog() {
        const input = this.template.querySelector('input[type="file"]');
        if (input) input.click();
    }
 
    // ✅ NEW: handle Browse button click separately to prevent double trigger
    handleBrowseClick(event) {
        event.stopPropagation();
        this.triggerFileDialog();
    }
 
    // ✅ NEW: dynamic filename display for UI
    get displayedFileName() {
        return this.fileData && this.fileData.filename ? this.fileData.filename : 'No file chosen';
    }
 
    // 🔧 handleFileChange() — same logic, added “cancel” and proper reset handling
    async handleFileChange(event) {
        const file = event.target.files[0];
        if (!file) {
            // If user cancels file selection
            this.fileData = null;
            return;
        }
 
        const maxSize = 500 * 1024; // 500 KB
        if (file.size > maxSize) {
            this.showToast('Error', 'File size should not exceed 500 KB.', 'error');
            this.errorMessage = 'File size should not exceed 500 KB.';
            this.showErrorMessage = true;
            setTimeout(() => { this.showErrorMessage = false; }, 2000); // auto-hide after 4s
            this.fileData = null;
            event.target.value = '';
            return;
        }
 
        if (!file.type.startsWith('image/')) {
            this.showToast('Error', 'Please upload an image file only.', 'error');
            this.fileData = null;
            event.target.value = '';
            return;
        }
 
        this.isCompressing = true;
 
        try {
            console.log('🔄 Always compressing image before upload...');
 
            const compressedBase64 = await this.compressImage(file);
            const compressedSize = Math.round((compressedBase64.length * 3) / 4);
 
            if (compressedSize > maxSize) {
                this.showToast(
                    'Warning',
                    'Image could not be compressed below 500 KB. Please choose a smaller image.',
                    'warning'
                );
                this.fileData = null;
                event.target.value = '';
                return;
            }
 
            this.fileData = {
                filename: file.name,
                base64: compressedBase64,
                previewUrl: 'data:image/jpeg;base64,' + compressedBase64,
                contentType: 'image/jpeg',
                originalSize: file.size,
                compressedSize: compressedSize
            };
 
            const savedPercent = Math.round((1 - compressedSize / file.size) * 100);
            this.showToast('Info', `Image compressed successfully (${savedPercent}% smaller).`, 'info');
            console.log(`✅ Final compressed size: ${Math.round(compressedSize / 1024)} KB`);
        } catch (error) {
            console.error('❌ File compression failed:', error);
            this.showToast('Error', 'Failed to compress image. Please try again.', 'error');
            this.fileData = null;
        } finally {
            this.isCompressing = false;
        }
    }
 
    // Compress image logic — unchanged
    compressImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    let width = img.width;
                    let height = img.height;
                    const MAX_DIMENSION = 1280;
 
                    if (width > height) {
                        if (width > MAX_DIMENSION) {
                            height = Math.round((height * MAX_DIMENSION) / width);
                            width = MAX_DIMENSION;
                        }
                    } else {
                        if (height > MAX_DIMENSION) {
                            width = Math.round((width * MAX_DIMENSION) / height);
                            height = MAX_DIMENSION;
                        }
                    }
 
                    canvas.width = width;
                    canvas.height = height;
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(img, 0, 0, width, height);
 
                    let quality = 0.75;
                    let attempt = 0;
                    const maxAttempts = 5;
 
                    const tryCompress = () => {
                        canvas.toBlob((blob) => {
                            if (!blob) {
                                reject('Compression failed - Blob is null');
                                return;
                            }
 
                            const reader2 = new FileReader();
                            reader2.onload = () => {
                                const base64 = reader2.result.split(',')[1];
                                if (base64.length * 3 / 4 <= 500 * 1024 || attempt >= maxAttempts) {
                                    console.log(`✅ Compressed with quality ${quality} after ${attempt + 1} attempts`);
                                    resolve(base64);
                                } else {
                                    attempt++;
                                    quality -= 0.15;
                                    tryCompress();
                                }
                            };
                            reader2.readAsDataURL(blob);
                        }, 'image/jpeg', quality);
                    };
 
                    tryCompress();
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
 
    get saveButtonLabel() {
        if (this.isCompressing) return 'Processing...';
        return this.isSaving ? 'Uploading…' : 'Save Sticker';
    }
 
    get disableSaveButton() {
        return this.isSaving || this.isCompressing || !this.stickerName || !this.fileData;
    }
 
    async handleSave() {
        if (!this.fileData) {
            this.showToast('Error', 'Please select a file to upload.', 'error');
            return;
        }
 
        this.isSaving = true;
        this.showErrorMessage = false;
        this.showSuccessCheck = false;
 
        try {
            const stickerObj = [{
                Name: this.stickerName,
                Base64Body: this.fileData.base64,
                ContentType: this.fileData.contentType,
                AttachmentID: null,
                ContentDocumentId: null,
                Id: null
            }];
 
            const jsonString = JSON.stringify(stickerObj);
            const jsonSize = jsonString.length;
            console.log('🚀 Sending to Apex - JSON size:', Math.round(jsonSize / 1024), 'KB');
 
            if (jsonSize > 4 * 1024 * 1024) {
                throw new Error('File still too large after compression. Please use a smaller image.');
            }
 
            await createStickerBridge({
                valueStreamId: this.selectedStream,
                jsonString: jsonString
            });
 
            this.showSuccessCheck = true;
            this.showToast('Success', 'Sticker uploaded successfully!', 'success');
 
            setTimeout(() => {
                this.dispatchEvent(new CloseActionScreenEvent());
                eval("$A.get('e.force:refreshView').fire();");
            }, 900);
 
            this.resetForm();
            setTimeout(() => { this.showSuccessCheck = false; }, 1500);
 
        } catch (error) {
            console.error('❌ Upload failed:', JSON.stringify(error));
            const errorMsg =
                error?.body?.message ||
                error?.message ||
                'Sticker upload failed. Please try again.';
            this.showToast('Error', errorMsg, 'error');
            this.errorMessage = errorMsg;
            this.showErrorMessage = true;
            setTimeout(() => { this.showErrorMessage = false; }, 5000);
        } finally {
            this.isSaving = false;
        }
    }
 
    resetForm() {
        this.stickerName = '';
        this.selectedStream = this.isGlobal ? '' : this.recordId || '';
        this.fileData = null;
        const fileInput = this.template.querySelector('input[type="file"], lightning-input[type="file"]');
        if (fileInput) fileInput.value = null;
    }
 
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
 
    get formattedFileSize() {
        if (!this.fileData?.compressedSize) return '';
        const size = Math.round(this.fileData.compressedSize / 1024);
        return `${size} KB`;
    }
 
    get showCompressionInfo() {
        return this.fileData && this.fileData.originalSize !== this.fileData.compressedSize;
    }
 
    get compressionRatio() {
        if (!this.showCompressionInfo) return '';
        const original = Math.round(this.fileData.originalSize / 1024);
        const compressed = Math.round(this.fileData.compressedSize / 1024);
        const saved = Math.round((1 - this.fileData.compressedSize / this.fileData.originalSize) * 100);
        return `Original: ${original} KB → Compressed: ${compressed} KB (${saved}% smaller)`;
    }
}
 
 