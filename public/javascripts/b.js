var quantity = document.getElementById("quantity");

function fn_quantity(){
    if(quantity.value > 5){ 
        alert("한번에 가능한 모여라 인원 수는 최대 5명입니다."); 
        quantity.select(); 
        return;
    } 
}