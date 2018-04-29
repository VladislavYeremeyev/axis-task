$(document).ready(function() {

    function getRandomNumber(min, max) {     //not including max
    return Math.floor(Math.random() * (max - min)) + min;
    }

    function getTaskText(a, b) {
        $('#first-number').text(a);
        $('#second-number').text(b);
        //$('#result').text(a + b);
    }

    function drawFirstCurve(a) {
        let coordOfA = a * 39;     //x coordinates of A point
        let path = '<path d="M0 105 C 50 -10, ' + (coordOfA - 50).toString() + ' -10, ' + coordOfA.toString() + ' 105" stroke="#af0089" stroke-width="3" stroke-miterlimit="10" fill="transparent">';
        $('#curves').append(path);
        $('#curves').append('<line x1="' + coordOfA.toString() + '" y1="105" x2="' + (coordOfA - 3).toString() + '" y2="85" stroke="#af0089" stroke-width="3">');
        $('#curves').append('<line x1="' + coordOfA.toString() + '" y1="105" x2="' + (coordOfA - 15).toString() + '" y2="90" stroke="#af0089" stroke-width="3">');
        $('#curves').html($('#curves').html());  //resolving problem with different namespaces for html and svg
        $('path:first').addClass('path');

        $('#first-number-input').show();
        $('#first-number-input').css('left', coordOfA/2 + 20)
        $('#first-number-input').css('top',  -110);
    }

    function drawSecondCurve(a, b) {
        let coordOfA = a * 39;
        let coordOfB = coordOfA + b * 39;     //x coordinates of B point
        let path = '<path d="M ' + coordOfA.toString() + ' 105 C ' + (coordOfA + 20).toString() + ' 25, ' + (coordOfB - 20).toString() + ' 25, ' + coordOfB.toString() + ' 105" stroke="#af0089" stroke-width="3" stroke-miterlimit="10" fill="transparent">';
        $('#curves').append(path);
        $('#curves').append('<line x1="' + coordOfB.toString() + '" y1="105" x2="' + (coordOfB + 1).toString() + '" y2="85" stroke="#af0089" stroke-width="3">');
        $('#curves').append('<line x1="' + coordOfB.toString() + '" y1="105" x2="' + (coordOfB - 15).toString() + '" y2="90" stroke="#af0089" stroke-width="3">');
        $('path:first').removeClass('path');
        $('#curves').html($('#curves').html());  //resolving problem with different namespaces for html and svg
        $('path:last').addClass('path');
        

        $('#second-number-input').show();
        $('#second-number-input').css('left', (coordOfB + coordOfA)/2 + 20);
        $('#second-number-input').css('top',  -85);
    }

    $(':input[type="text"]').on('input', function() {
        if(this.id === 'first-number-input') {
            if($(this).val() !== a.toString()) {
                $('#first-number-input').css('color',  'red');
                $('#first-number').css('background',  '#ffa844');
            }
            else {
                $(this).replaceWith('<span class="number-completed" style="left: ' + (a * 39 / 2 + 30).toString() + 'px; top: -100px;">' + a + '</span>');
                $('#first-number').css('background',  'none');
                drawSecondCurve(a, b);
            }
        }
        else if(this.id === 'second-number-input') {
            if($(this).val() !== b.toString()) {
                $('#second-number-input').css('color',  'red');
                $('#second-number').css('background',  '#ffa844');
            }
            else {
                $(this).replaceWith('<span class="number-completed" style="left: ' + ((a + b/2) * 39 + 30).toString() + 'px; top: -75px;">' + b + '</span>');
                $('#second-number').css('background',  'none');
                $('#result').hide();
                $('#result-input').show();
            }
        }
        else if(this.id === 'result-input') {
            if($(this).val() !== (a + b).toString()) {
                $('#result-input').css('color',  'red');
            }
            else {
                $('#result-input').replaceWith('<span id="result">' + (a + b).toString() + '</span>');
            }
        }
    });

    let a = getRandomNumber(6, 10);
    let b = getRandomNumber(11, 15) - a;
    getTaskText(a, b);
    drawFirstCurve(a);
});