class CleanData {
    ID; 
    segments; 
    AveragePrice; 
    CurrencySymbol;
    constructor(ID, segments, AveragePrice, CurrencySymbol) {
        this.ID = ID;
        this.segments = segments;
        this.AveragePrice = AveragePrice;
        this.CurrencySymbol = CurrencySymbol;
    }
}

class Segment {
    legs;
    SegmentDuration;
    AirlineCode;
    constructor(legs,SegmentDuration,AirlineCode) {
        this.legs = legs;
        this.SegmentDuration = SegmentDuration;
        this.AirlineCode = AirlineCode;
    }
}

class Leg{
    departurePoint;
    arrivalPoint;
    flightNumber;
    airlineName;
    airlineCode;
    constructor(departurePoint,arrivalPoint,flightNumber, airlineName, airlineCode){
        this.departurePoint = departurePoint;
        this.arrivalPoint = arrivalPoint;
        this.flightNumber = flightNumber;
        this.airlineName = airlineName;
        this.airlineCode = airlineCode;
    }
}

exports.Leg = Leg;
exports.Segment = Segment;
exports.CleanData = CleanData;
