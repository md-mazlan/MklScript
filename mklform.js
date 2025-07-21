class MklForm {
    constructor(form) {
        this.action = form.action || '';
        this.method = form.method || 'POST';
        this.formData = new FormData(form);
        this.form = form;
        this.isNeedValidation = true;
        form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    }
    dataLength() {
        return Array.from(this.formData.entries()).length;
    }
    setNeedValidation(isNeedValidation) {
        this.isNeedValidation = isNeedValidation;
    }
    submit(onLoading, onFinish ){
        let res = {};
        res.success = false;
        res.message = '';
        res.error = '';
        res.responseText = null;
        if(this.isNeedValidation){
            this.form.reportValidity();
            if(!this.form.checkValidity()){
                res.error = 'Form validation failed';
                onFinish(res);
                return;
            }
        }
        if (this.dataLength() > 0) {
            let ajax = new XMLHttpRequest();
            ajax.open(this.method, this.action, true);
            ajax.onload = function (ev) {
                if (ajax.status >= 200 && ajax.status < 300) {
                    res.success = true;
                    res.message = 'Form submitted successfully';
                    res.responseText = ajax.responseText;
                } else {
                    res.error = ev.target.status + ' ' + ev.target.statusText;
                }
                onFinish(res);
            };
            ajax.onerror = function (e) {
                res.error = e;
                onFinish(res);
            };
            ajax.send(this.formData);
            onLoading();
        } else {
            res.error = 'No data to submit';
            onFinish(res);
        }
    }

    setSubmitFunction(onLoading, onFinish) {
        if (this.form) {
            this.form.addEventListener('submit', (event) => {
                event.preventDefault();
                this.submit(onLoading, onFinish);
            });
        } else {
            console.error('Form not found');
        }
    }

    


}
