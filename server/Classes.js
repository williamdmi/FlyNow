class CleanData {
    ID;
    Segments;
    AveragePrice;
    CurrencySymbol;
    constructor(ID, segments, AveragePrice, CurrencySymbol) {
        this.ID = ID;
        this.Segments = segments;
        this.AveragePrice = AveragePrice;
        this.CurrencySymbol = CurrencySymbol;
    }
}

class Segment {
    Legs;
    SegmentDuration;
    AirlineCode;
    constructor(legs, SegmentDuration, AirlineCode) {
        this.Legs = legs;
        this.SegmentDuration = SegmentDuration;
        this.AirlineCode = AirlineCode;
    }
}

class Leg {
    DeparturePoint;
    ArrivalPoint;
    FlightNumber;
    AirlineName;
    AirlineCode;
    constructor(departurePoint, arrivalPoint, flightNumber, airlineName, airlineCode) {
        this.DeparturePoint = departurePoint;
        this.ArrivalPoint = arrivalPoint;
        this.FlightNumber = flightNumber;
        this.AirlineName = airlineName;
        this.AirlineCode = airlineCode;
    }
}

exports.Leg = Leg;
exports.Segment = Segment;
exports.CleanData = CleanData;
