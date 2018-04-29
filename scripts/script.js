$(document).ready(function() {
    let $curves = $('#curves');
    let $firstNumber = $('#first-number');
    let $firstNumberInput = $('#first-number-input');
    let $secondNumber = $('#second-number');
    let $secondNumberInput = $('#second-number-input');

    function getRandomNumber(min, max) {     //not including max
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getTaskText(a, b) {   //change task text
        $firstNumber.text(a);
        $secondNumber.text(b);
    }

    function drawFirstCurve(a) {
        let coordOfA = a * 39 + 35;     //x coordinates of A point
        let path = '<path d="M36 105 C 86 -10, ' + (coordOfA - 50).toString() + ' -10, ' + coordOfA.toString() + 
                    ' 105" stroke="#af0089" stroke-width="3" stroke-miterlimit="10" fill="transparent">';  
        $curves.append(path)  //append svg path element
            //create arrow head
            .append('<line x1="' + coordOfA.toString() + '" y1="105" x2="' + (coordOfA - 3).toString() + '" y2="85" stroke="#af0089" stroke-width="3">')
            .append('<line x1="' + coordOfA.toString() + '" y1="105" x2="' + (coordOfA - 15).toString() + '" y2="90" stroke="#af0089" stroke-width="3">')
            .html($curves.html());  //resolving problem with different namespaces for html and svg

        $('path:first').addClass('path');  //animate path

        $firstNumberInput.show()
            .css({
                'left': (coordOfA/2).toString() + 'px',
                'top': '-25px'
            });
    }

    function drawSecondCurve(a, b) {
        let coordOfA = a * 39 + 35;           //x coordinates of A point
        let coordOfB = coordOfA + b * 39;     //x coordinates of B point
        let path = '<path d="M ' + coordOfA.toString() + ' 105 C ' + (coordOfA + 20).toString() + ' 25, ' + (coordOfB - 20).toString() + ' 25, ' + 
                    coordOfB.toString() + ' 105" stroke="#af0089" stroke-width="3" stroke-miterlimit="10" fill="transparent">';
        $curves.append(path)  //append svg path element
            //create arrow head
            $curves.append('<line x1="' + coordOfB.toString() + '" y1="105" x2="' + (coordOfB).toString() + '" y2="85" stroke="#af0089" stroke-width="3">');
            $curves.append('<line x1="' + coordOfB.toString() + '" y1="105" x2="' + (coordOfB - 13).toString() + '" y2="90" stroke="#af0089" stroke-width="3">');

        $('path:first').removeClass('path');  //avoid reanimate first path
        $curves.html($('#curves').html());  //resolving problem with different namespaces for html and svg
        $('path:last').addClass('path');  //animate second path
        

        $secondNumberInput.show()
            .css({
                'left': (coordOfA + (coordOfB - coordOfA) / 2 - 17).toString() + 'px',
                'top': '5px'
            });
    }

    $(':input[type="text"]').on('input', function() { 
        $thisObj = $(this);  
        $resultInput = $('#result-input');

        if(this.id === 'first-number-input') {      //input event handler for all inputs
            if($thisObj.val() !== a.toString()) {           //check input value
                $firstNumberInput.css('color',  'red');
                $firstNumber.css('background',  '#ffa844');
            }
            else {
                $thisObj.replaceWith('<span class="number-completed" style="left: ' + (a * 39 / 2 + 30).toString() + 'px; top: -15px;">' + a + '</span>');
                $firstNumber.css('background',  'none');
                drawSecondCurve(a, b);
            }
        }
        else if(this.id === 'second-number-input') {
            if($thisObj.val() !== b.toString()) {
                $secondNumberInput.css('color',  'red');
                $secondNumber.css('background',  '#ffa844');
            }
            else {
                $thisObj.replaceWith('<span class="number-completed" style="left: ' + ((a + b/2) * 39 + 30).toString() + 'px; top: 10px;">' + b + '</span>');
                $secondNumber.css('background',  'none');
                $('#result').hide();
                $resultInput.show();
            }
        }
        else if(this.id === 'result-input') {
            if($thisObj.val() !== (a + b).toString()) {
                $resultInput.css('color',  'red');
            }
            else {
                $resultInput.replaceWith('<span id="result">' + (a + b).toString() + '</span>');
            }
        }
    });

    let a = getRandomNumber(6, 10);
    let b = getRandomNumber(11, 15) - a;
    getTaskText(a, b);
    drawFirstCurve(a);
});