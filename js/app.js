var APPLICATION_ID = '',
    SECRET_KEY = '',
    VERSION = 'v1'; //default application version;
Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

// Pagesize
var dataQuery = {
    options: {
        pageSize: 96
    }
};

Backendless.Persistence.of(quarterdata).find(dataQuery, new Backendless.Async(gotOk, gotError));
document.getElementById('quarterdataHeading').innerHTML = 'Temperatur og Fugtighed det seneste døgn';

Backendless.Persistence.of(hourdata).find(dataQuery, new Backendless.Async(gotOk, gotError));
document.getElementById('hourdataHeading').innerHTML = 'Temperatur og Fugtighed de seneste 4 døgn';

//Changing pagesize på 30 before getting last one
dataQuery = {
    options: {
        pageSize: 30
    }
};
Backendless.Persistence.of(dailydata).find(dataQuery, new Backendless.Async(gotOk, gotError));
document.getElementById('dailydataHeading').innerHTML = 'Temperatur og Fugtighed de seneste 30 døgn';


// Callback on Success 
function gotOk(dataCollection) {
    
    // Reformatting the data, so it fits chart.js
    var t = new Array(),
        p = new Array(),
        h = new Array(),
        labels = new Array();

    var i = 1;
    dataCollection.data.forEach(function(obj) {
        t.unshift(obj.t)
        h.unshift(obj.h)
        p.unshift(obj.p)
        if (true || i % 10 == 0 || i == 1) { // Dont show all labels. that will be too crowded
            labels.unshift(pp(new Date(obj.created)))
        }
        else {
            labels.unshift('');
        }
        i++
    });

    // Local options
    var opt = {
        scaleBeginAtZero: false,
        datasetFill: false,
        pointDot: false,
        pointHitDetectionRadius: 4,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\">&nbsp;&nbsp;</span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    }

    // The two datasets: humidity and temperature
    var data = {
        labels: labels,
        datasets: [{
            label: "Temeratur&nbsp;(&deg;C)",
            unit: " C",
            strokeColor: "rgba(21,100,212,1)",
            pointColor: "rgba(21,100,212,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: t
        }, {
            label: "Fugtighed&nbsp;(%)",
            unit: "%",
            strokeColor: "rgba(21,212,37,1)",
            pointColor: "rgba(21,212,37,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: h
        }]
    };

    var canvas = document.getElementById(dataCollection.constructor.name);
    // Get the context of the canvas element we want to select
    var ctx = canvas.getContext("2d");

    var myLineChart = new Chart(ctx).Line(data, opt);
    document.getElementById('legend').innerHTML = myLineChart.generateLegend();

}

// Callback on Error
function gotError(err) {
    console.log("Error recieved from backendledd " + err.message);
}

// Pretty print date/time
function pp(date) {
    return date.getDate() + ". " + ['Jan.', 'Feb.', 'Mar.',
            'Apr.', 'Maj', 'Jun.',
            'Jul.', 'Aug.', 'Sep.',
            'Okt.', 'Nov.', 'Dec.'
        ][date.getMonth()] + " " +
        date.getFullYear() + " " +
        date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2);
}

// Resize canvas to take full advantage of screen width
function resizeCanvas() {
    var elems = document.getElementsByTagName('canvas');
    elems[0].width = window.innerWidth - 15;
    elems[1].width = window.innerWidth - 15;
    elems[2].width = window.innerWidth - 15;

}

// Object constructors
function quarterdata(args) {
    args = args || {};
    this.t = args.t || "";
    this.h = args.h || "";
    this.p = args.p || "";
}

function hourdata(args) {
    args = args || {};
    this.t = args.t || "";
    this.h = args.h || "";
    this.p = args.p || "";
}

function dailydata(args) {
    args = args || {};
    this.t = args.t || "";
    this.h = args.h || "";
    this.p = args.p || "";
}