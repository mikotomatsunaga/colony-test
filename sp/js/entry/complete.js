var extime = new Date().getTime();
        var cltime = new Date(extime - 1800);
        var exdate = cltime.toUTCString();
        var s="";
        s += "mpu1="+"";
        s += "; path=/";
        s += "; expires=" +exdate+"; ";
        document.cookie=s;