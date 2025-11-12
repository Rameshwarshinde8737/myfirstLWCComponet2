({
    greet : function(component, event, helper) {
        let student = component.get("v.student");
        alert("Hello " + student.name + "! Age: " + student.age);
    }
})