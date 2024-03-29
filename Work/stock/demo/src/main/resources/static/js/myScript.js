// 회사명 검색바 내용 삭제
function fClose() {
    var inputbar = document.getElementById('input');
    inputbar.value = "";
}
// 회사코드 검색바 내용 삭제
function fClose1() {
    var inputbar1 = document.getElementById('input1');
    inputbar1.value = "";
}

// 서버시간 호출
setInterval(function request_Time() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/getTime",
        data: {
            timezone: "Asia/Seoul",
            datetime: "http://localhost:8080/getTime?timezone=Asia/Seoul"
        },
        success: function (res) {
            const time = document.getElementById("time");
            time.innerHTML = res.datetime;
        },
        error: function () {
            alert("TimeZone Fail");
        }
    })
}, 1000) // 1초마다 한번씩


// 회사명으로 입력받은 param으로 result 호출하기
function searchStockName() {
    var input = $('#input').val(); // input에서 회사명 입력 받은 것
    if (window.event.keyCode == 13) {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/searchName?param=" + input,
            success: function (res) {
                const result = document.getElementById("result");
                result.innerHTML = res.result;
            },
            error: function () {
                alert("종목명이 존재하지 않습니다.");
            }
        })
    }
}

// 삭제버튼
function delResult(idx){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/delResult?idx=" + idx,
        success: function(idx){
            const result = document.getElementById("result"); // result 출력창
            result.innerHTML = idx.result; // 삭제 후 재출력
        },
        error: function(){
            alert("Delete Fail");
        }
    })
}