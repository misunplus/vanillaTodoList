const todayContainer = document.querySelector(".js-toDay");
    todayTitle = todayContainer.querySelector("h1");

    function getToday(){
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth();
        const yyyy = today.getFullYear();
        todayTitle.innerText = `${yyyy}년 ${mm <10 ? `0${mm}`:mm}월 ${dd < 10 ? `0${dd}` : dd}일`;
    }

    function init(){
        getToday();
        setInterval(getToday, 1000);
    };
    init();