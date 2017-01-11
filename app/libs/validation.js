

var
    input,
    container,
    //CSS CLASSES
    classSuccess = "success",
    classError = "error",
    //FORM VALIDATOR
    formValidator = {
        init: function() {
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function() {
            //MAIN PARENT ELEMENT
            this.contactForm = document.getElementById("contactForm");
            //MAIN FORM ELEMENTS
            this.inputContainer = document.getElementsByClassName("inputContainer");
            //INPUT FIELDS
            this.fields = {
                userName: document.getElementById("userName"),
                userCity: document.getElementById("userCity"),
                userDate: document.getElementById("userDate"),
                userMonth: document.getElementById("userMonth"),
                userYear: document.getElementById("userYear")
            };
            this.submitBtn = document.getElementById("submitBtn");
        },
        bindEvents: function() {
            var i;
            //RUN RULES ON SUBMIT BUTTON CLICK
            this.submitBtn.onclick = this.runRules.bind(this);
            //BIND EVENTS TO EACH INPUT FIELD
            for (i in this.fields) {
                if (this.fields.hasOwnProperty(i)) {
                    //VARIABLES
                    input = this.fields[i];
                    container = input.parentElement;
                    //RUN RULES WHEN INPUT HAS FOCUS
                    /*input.onfocus = this.runRules.bind(this);*/
                    //RESET ERRORS WHEN CONTAINER IS CLICKED
                    container.onclick = this.resetErrors.bind(this, input);
                }
            }
        },
        runRules: function(evnt) {
            var target = evnt.target,
                type = evnt.type;
            //IF EVENT ON SUBMIT BUTTON
            if (target === this.submitBtn) {
                //PREVENT FORM SUBMITTION
                this.preventDefault(evnt);
                //IF INPUT HAS FOCUS
            } else if (type === "focus") {
                //RESET CLASSLIST
                this.resetClassList(target.parentElement);
                //RESET ERRORS
                this.resetErrors(target);
                return false;
            }
            //RESET CLASSLIST
            this.resetClassList();
            //CHECK FIELDS
            this.checkFields();
        },
        preventDefault: function(evnt) {
            //PREVENT DEFUALT
            evnt.preventDefault();
        },
        checkFields: function() {
            var i,
                validCount = 0;
            //CYLCE THROUGH INPUTS
            for (i in this.fields) {
                if (this.fields.hasOwnProperty(i)) {
                    input = this.fields[i];
                    //CHECK IF FIELD IS EMPTY
                    if (input.value === "") {
                        //ADD ERROR CLASS
                        this.addClass(input, classError);
                    } else {
                        //FIELD IS VALID
                        this.addClass(input, classSuccess);
                        validCount += 1;
                    }
                }
            }
            //IF ALL FEILDS ARE VALID
            if (validCount === 5) {
                //SUBMIT FORM
                this.submitForm();
            }
        },
        addClass: function(input, clss) {
            container = input.parentElement.parentElement;
            //IF INPUT HAS ERROR
            if (clss === classError) {
                //SHOW ERROR MESSAGE
                this.errorMessage(input);
            }
            //ADD CLASS
            input.parentElement.parentElement.classList.add(clss);
        },
        errorMessage: function(input) {
            var message;
            if (input === this.fields.userName) {
                message = "Enter your name";
            } else if (input === this.fields.userCity) {
                message = "Enter your city";
            } else if (input === this.fields.userDate) {
                message = "Enter your birth date";
            } else if (input === this.fields.userMonth) {
                message = "Enter your birth date";
            } else if (input === this.fields.userYear) {
                message = "Enter your birth date";
            }
            this.renderError(input, message);
        },
        renderError: function(input, message) {
            var html;
            //GET INPUT CONTAINER
            container = input.parentElement.parentElement;
            //RENDER HTML
            html = document.createElement("div");
            html.setAttribute("class", "message");
            html.innerHTML = message;
            //IF MESSAGE ELEMENT DOESN'T EXIST
            if (!container.getElementsByClassName("message")[0]) {
                //INSERT MESSAGE TO INPUT CONTAINER
                container.insertBefore(html, container.firstElementChild);
            }
        },
        resetClassList: function(input) {
            var i;
            //IF TARGETING SPECIFIC INPUT
            if (input) {
                //GET INPUT CONTAINER
                container = input.parentElement.parentElement;
                //REMOVE CLASSES
                container.classList.remove(classError, classSuccess);
                //FOCUS ON INPUT FIELD
                input.focus();
            } else {
                for (i in this.fields) {
                    if (this.fields.hasOwnProperty(i)) {
                        //REMOVE CLASSES FROM ALL FIELDS
                        this.fields[i].parentElement.classList.remove(classError, classSuccess);
                    }
                }
            }
        },
        resetErrors: function(input) {
            //GET INPUT CONTAINER
            container = input.parentElement.parentElement;
            //IF CONTAINER CONTAINS ERROR
            if (container.classList.contains(classError)) {
                this.resetClassList(input);
            }
        },
        submitForm: function() {
            /*SOME ACTION*/
        }
    };

//INITIATE FORM VALIDATOR
formValidator.init();
