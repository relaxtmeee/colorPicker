

function colorpicker(block) {


    const parent = document.querySelector(block);

    const imgParent = document.querySelector('.color-picker_image');
    imgParent.style.width = `200px`;
    imgParent.style.height = `200px`;

    const img = document.querySelector('.color-picker_image canvas');
    img.width = 200;
    img.height = 200;
    img.style.backgroundColor = `red`;

    //наполнение канваса градиентом
    let canva = document.querySelector(".color-picker_canvas canvas");	
   
    canva.width = w =  25;
    canva.height = h = 200;

    let gradient,hue,color,ctx;
		
    ctx = canva.getContext("2d");

    gradient = ctx.createLinearGradient(w/2,h,w/2,0);
 
    hue = [[255,0,0],[255,255,0],[0,255,0],[0,255,255],[0,0,255],[255,0,255],[255,0,0]];

    for (var i=0; i <= 6;i++){
        
    color = 'rgb('+hue[i][0]+','+hue[i][1]+','+hue[i][2]+')';
        gradient.addColorStop(i*1/6, color);
    };

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w ,h);	


    // создаем canvas с картинкой 

    let canvas = document.querySelector('.color-picker_image canvas'),
        context = canvas.getContext('2d');

    gradient2 = context.createLinearGradient(0, 200, 200, 0);
    gradient2.addColorStop(0, 'black');
    gradient2.addColorStop(0.5, 'red');
    gradient2.addColorStop(1, 'white');
    context.fillStyle = gradient2;
    context.fillRect(0, 0, 200 ,200);	

    // смена цвета блока img при движении на на градиенте

    canva.addEventListener('mousedown', e => {

        canva.addEventListener('click', startMove);
        canva.addEventListener('mousemove', startMove);
        canva.addEventListener('mouseup', stopMove);
        

        function startMove(e) {
            let c = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
            let totalColor = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;

            gradient2 = context.createLinearGradient(0, 200, 200, 0);
            gradient2.addColorStop(0, 'black');
            gradient2.addColorStop(0.5, totalColor);
            gradient2.addColorStop(1, 'white');
            context.fillStyle = gradient2;
            context.fillRect(0, 0, 200 ,200);	
        }

        function stopMove() {
            canva.removeEventListener('mousemove', startMove);
        }

    });



    // перетаскивание круга на картинке
    
    const circle = document.querySelector('.color-picker_circle');

    img.addEventListener('mousedown', e => imgMouseDown(e));
    circle.addEventListener('mousedown', e => imgMouseDown(e));

    function imgMouseDown(e){

        document.addEventListener('mousemove', onMouseMove);

        circle.addEventListener('mouseup', stopMove);
        
        function stopMove() {
            document.removeEventListener('mousemove', onMouseMove);
            circle.onmouseup = null;
        };       

        

    };

    img.addEventListener('click', e => {
        onMouseMove(e);
    })

    function moveAt(pageX, pageY) {
        circle.style.left = pageX - circle.offsetWidth / 2 + 'px';
        circle.style.top = pageY - circle.offsetHeight / 2 + 'px';
        if (pageY > img.offsetTop && pageY < img.offsetTop + img.offsetHeight/2) {
           circle.classList.remove('active'); 
        } else {
            circle.classList.add('active'); 
        }
        // const outColor = document.querySelector('.color-picker_out');
        let b = context.getImageData(pageX - img.offsetLeft, pageY - img.offsetTop, 1, 1).data;
        let totalColor = `rgb(${b[0]}, ${b[1]}, ${b[2]})`;
        console.log(totalColor);
        // outColor.style.background = `${totalColor}`;
       
    }   

    function onMouseMove(e) {
        if (window.event.clientX > img.offsetLeft && window.event.clientX < img.offsetLeft + img.offsetWidth && window.event.clientY > img.offsetTop && window.event.clientY < img.offsetTop + img.offsetHeight) {
            e.pageX
            moveAt(e.pageX, e.pageY); 
        } else if (window.event.clientX > img.offsetLeft && window.event.clientX < img.offsetLeft + img.offsetWidth && window.event.clientY < img.offsetTop) {
            moveAt(e.pageX, img.offsetTop); 
        } else if (window.event.clientX > img.offsetLeft && window.event.clientX < img.offsetLeft + img.offsetWidth && window.event.clientY > img.offsetTop + img.offsetHeight) {
            moveAt(e.pageX, img.offsetTop + img.offsetHeight); 
        } else if (window.event.clientX < img.offsetLeft && window.event.clientY > img.offsetTop && window.event.clientY < img.offsetTop + img.offsetHeight) {
            moveAt(img.offsetLeft, e.pageY); 
        } else if(window.event.clientX > img.offsetLeft + img.offsetWidth && window.event.clientY > img.offsetTop && window.event.clientY < img.offsetTop + img.offsetHeight){
            moveAt(img.offsetLeft + img.offsetWidth, e.pageY); 
        }
    }
    circle.ondragstart = function() {
        return false;
    };


    



}


colorpicker('.color-picker');