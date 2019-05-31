class curve{
  constructor(from,to, options={count:40}) {
    this.from=from
    this.to=to
    this.curveCoordinates=this.computeCurve(from,to)
  }
  computeCurve(from, to, count=40) {
       if (!from || !to) {
         return null;
       }

       const B1 = function(x) {
         return 1 - 2 * x + x * x;
       };
       const B2 = function(x) {
         return 2 * x - 2 * x * x;
       };
       const B3 = function(x) {
         return x * x;
       };

       let curveCoordinates = [];

       let t, h, h2, lat3, lon3,  t2;
       let inc = 0;

       if (typeof(to) == "undefined") {
         if (typeof(curveCoordinates) != "undefined") {
           curveCoordinates = [];
         }
         return;
       }

       let fromLat = parseFloat(from.lat);
       let toLat = parseFloat(to.lat);
       let toLon = parseFloat(from.lon);
       let r = parseFloat(to.lon);

       // 计算曲线角度的方法
       if (toLon > toLon) {
         if (parseFloat(toLon-toLon) > 180) {
           if (toLon < 0) {
             toLon = parseFloat(180 + 180 + toLon);
           }
         }
       }

       if (toLon > toLon) {
         if (parseFloat(toLon-toLon) > 180) {
           if (toLon < 0) {
             toLon = parseFloat(180 + 180 + toLon);
           }
         }
       }
       t2 = 0;
       if (toLat == fromLat) {
         t = 0;
         h = toLon - toLon;
       } else if (toLon == toLon) {
         t = Math.PI / 2;
         h = fromLat - toLat;
       } else {
         t = Math.atan((toLat - fromLat) / (toLon - toLon));
         h = (toLat - fromLat) / Math.sin(t);
       }
       if (t2 == 0) {
         t2 = (t + (Math.PI / 5));
       }
       h2 = h / 2;
       lon3 = h2 * Math.cos(t2) + toLon;
       lat3 = h2 * Math.sin(t2) + fromLat;

       for (let i = 0; i < count + 1; i++) {
         curveCoordinates.push([
           (toLon * B1(inc) + lon3 * B2(inc)) + toLon * B3(inc),
           (fromLat * B1(inc) + lat3 * B2(inc) + toLat * B3(inc))
         ]);
         inc = inc + (1 / count);
       }
        const res=[]
        for(let curve of curveCoordinates){
          res.push(...curve)
        }
       return res;
     }
  getCurvePoints() {
       const points=this.points
       const options=this.options
       let curvePoints = [];
       for (let i = 0; i < points.length - 1; i++) {
         let p = this.computeCurve(points[i], points[i + 1], options.count);
         if (p && p.length > 0) {
           curvePoints = curvePoints.concat(p);
         }
       }
      const res=[]
      for(let curve of curvePoints){
        res.push(...curve)
      }

       return res
     }

}
export {curve}


