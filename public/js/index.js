var myChart;
$(document).ready(function(){
    $.ajax( "/getLengthData" )
    .done(function(data) {
        var mappedData = $.map(data, function(n){
            return {t: n.t, y:n.length };
        });
        setGraph(mappedData);
        setProgressBar(data[data.length-1].length);
        setEstimates(data);
    })
    .fail(function(e) {
        console.log(e);
        var message = e.responseJSON.error;  
        $(".panel-body").html(message);
    })  
    
    $('#chartResize').on('click',function(){
        if($(this).hasClass("glyphicon-resize-full")){
            $(this).removeClass("glyphicon-resize-full");
            $(this).addClass("glyphicon-resize-small");
            $(this).parent().parent().parent().removeClass("col-md-6");
            $(this).parent().parent().parent().addClass("col-md-11");
            $(this).parent().parent().parent().addClass("col-centered");
        }
        else{
            $(this).removeClass("glyphicon-resize-small");
            $(this).addClass("glyphicon-resize-full");
            $(this).parent().parent().parent().removeClass("col-md-11");
            $(this).parent().parent().parent().addClass("col-md-6");
            $(this).parent().parent().parent().removeClass("col-centered");

        }
    })
});


function setGraph(data){
    $("#progress").show();
    $(".preloader").hide();
    Chart.defaults.global.defaultFontColor = '#ffffff';
    Chart.defaults.global.defaultFontFamily = 'Montserrat, sans-serif';
    var ctx = document.getElementById("progress").getContext('2d');
    myChart = new Chart(ctx, {
    type: 'line',
    data: {    
        datasets: [{
            label: 'Length',
            lineTension:0,
            data:data,
            backgroundColor: 'rgba(219, 170, 64, 0.4)',
            borderColor: 'rgba(219, 170, 64, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: { beginAtZero:false },
                scaleLabel: {
                    display: true,
                    labelString: 'Length (mm)'
                },
                gridLines: { color: "#1b99c3" }
            }],
            xAxes: [{
                type: 'time',
                distribution: 'linear',
                time: { unit: "day" },
                gridLines: { color: "#1b99c3" }
            }]
        }
    }
    });
 
}

function setProgressBar(currentLength){
    $("#currentLength").show();   
    $("#currentLengthBar").css({display:"block"});
    $("#currentLengthBarVal").prop("aria-valuenow",currentLength);
    $("#currentLengthBarVal").css({width: (currentLength/170)*100+"%" });
    $("#myCurrent").after(currentLength.toFixed(1)+"mm");
}

function setEstimates(data){
    var current = data[data.length-1];
    var starting = data[0];  
    var daysTotal = Math.floor( moment(current.t).diff(moment(starting.t)) / (1000*60*60*24)); 
    var growthTotal = current.length - starting.length;
    var growthRate = growthTotal / daysTotal
    var estDaysRem = Math.floor((170 -  current.length) / growthRate);
    var endDate = moment().add(estDaysRem, 'd');
   
    addStat("Days Recorded", daysTotal);
    addStat("Growth", growthTotal + "mm");
    addStat("Rate", growthRate.toFixed(1) + "mm per day")
    addStat("Estimated Days Remaining", estDaysRem)
    addStat("Estimated End Date", endDate.format("DD MMM YYYY"))
}

function addStat(title, value){
    $('#Estimates').append('<span><b>'+title+': </b>'+value+'</span>')
}