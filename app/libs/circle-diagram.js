

var data = {
    size: 90,
    sectors: [
        {
            percentage: 0.27,
            label: 'Dynamic percent value'
        },
        {
            percentage: 0.73,
            label: "other"
        }
    ]
}

function calculateSectors( data ) {
    var sectors = [];
    var colors = [
        "#ffa352", "#e7e8e8", "#BB3D49", "#DB4547"
    ];

    var l = data.size / 2
    var a = 0 // Angle
    var aRad = 0 // Angle in Rad
    var z = 0 // Size z
    var x = 0 // Side x
    var y = 0 // Side y
    var X = 0 // SVG X coordinate
    var Y = 0 // SVG Y coordinate
    var R = 0 // Rotation


    data.sectors.map( function(item, key ) {
        a = 360 * item.percentage;
        aCalc = ( a > 180 ) ? 360 - a : a;
        aRad = aCalc * Math.PI / 180;
        z = Math.sqrt( 2*l*l - ( 2*l*l*Math.cos(aRad) ) );
        if( aCalc <= 90 ) {
            x = l*Math.sin(aRad);
        }
        else {
            x = l*Math.sin((180 - aCalc) * Math.PI/180 );
        }

        y = Math.sqrt( z*z - x*x );
        Y = y;

        if( a <= 180 ) {
            X = l + x;
            arcSweep = 0;
        }
        else {
            X = l - x;
            arcSweep = 1;
        }

        sectors.push({
            percentage: item.percentage,
            label: item.label,
            color: colors[key],
            arcSweep: arcSweep,
            L: l,
            X: X,
            Y: Y,
            R: R
        });

        R = R + a;
    })


    return sectors
}

var percentView = document.createElement("span");
percentView.innerHTML = data.sectors[0].percentage*100+'%';

sectors = calculateSectors(data);
var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );
newSVG.setAttributeNS(null, 'style', "width: "+data.size+"px; height: " + data.size+ "px");
document.getElementById("pie-diagram").appendChild(percentView);
document.getElementById("pie-diagram").appendChild(newSVG);


sectors.map( function(sector) {

    var newSector = document.createElementNS( "http://www.w3.org/2000/svg","path" );
    newSector.setAttributeNS(null, 'fill', sector.color);
    newSector.setAttributeNS(null, 'd', 'M' + sector.L + ',' + sector.L + ' L' + sector.L + ',0 A' + sector.L + ',' + sector.L + ' 0 ' + sector.arcSweep + ',1 ' + sector.X + ', ' + sector.Y + ' z');
    newSector.setAttributeNS(null, 'transform', 'rotate(' + sector.R + ', '+ sector.L+', '+ sector.L+')');

    newSVG.appendChild(newSector);
})

var midCircle = document.createElementNS( "http://www.w3.org/2000/svg","circle");
midCircle.setAttributeNS(null, 'cx', data.size * 0.5 );
midCircle.setAttributeNS(null, 'cy', data.size * 0.5);
midCircle.setAttributeNS(null, 'r', data.size * 0.29 );
midCircle.setAttributeNS(null, 'fill', '#fff' );

newSVG.appendChild(midCircle);
