const socket = io();

document.getElementById('new_product_form').addEventListener('submit', (event) => {
    event.preventDefault();
    let new_obj = {};
    let fields = document.getElementsByClassName('new_product_form_input');
    for (element of fields) {
        field_title = element.name.replace('input_', '');
        new_obj[field_title] = element.value;
    }

    console.log(new_obj);
    socket.emit('product_submit', new_obj);

})