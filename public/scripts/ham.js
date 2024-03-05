$(document).ready(function(){
    $(".hamburgerBtn").click(function(){
        $(this).toggleClass("rotate");
        $(".nav-bar").toggleClass("opened");
    });
});