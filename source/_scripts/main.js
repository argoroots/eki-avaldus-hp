$(function () {

    $('#submit').click(function () {
        var data = {
            definition: 'prize-application',
            'prize-application-prize': $('#prize').val(),
            'prize-application-category': $('#category').val(),
            'prize-application-candidate-name': $('#candidate-name').val(),
            'prize-application-candidate-birthyear': $('#candidate-birthyear').val(),
            'prize-application-candidate-phone': $('#candidate-phone').val(),
            'prize-application-candidate-email': $('#candidate-email').val(),
            'prize-application-candidate-workplace': $('#candidate-workplace').val(),
            'prize-application-applicant-name': $('#applicant-name').val(),
            'prize-application-applicant-email': $('#applicant-email').val(),
            'prize-application-applicant-workplace': $('#applicant-workplace').val(),
            'prize-application-notes': $('#notes').val(),
            'prize-application-file': $('#file').val(),
            'prize-application-urls': $('#urls').val()
        }

        post(data, function(id) {
            console.log(id)
        })
    })

    function post (data, callback) {
        var expiration = new Date()
        expiration.setMinutes(expiration.getMinutes() + 10)

        var conditions = []
        for(k in data) {
            conditions.push({ k: data[k] })
        }

        data.user = window.entuApiUser
        data.policy = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify({ expiration: expiration.toISOString(), conditions: conditions })))
        data.signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(data['policy'], window.entuApiKey))

        $.ajax({
            method: 'POST',
            url: window.entuApiUrl + '/entity-' + window.entuApiId,
            cache: false,
            data: data,
            success: function(data) {
                callback(data.result.id)
            }
        })
    }
})
