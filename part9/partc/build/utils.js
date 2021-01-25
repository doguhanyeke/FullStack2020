"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueID = exports.toEntry = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const types_1 = require("./types");
const uuid_1 = require("uuid");
const isDate = (obj) => {
    return Boolean(Date.parse(obj));
};
const parseDate = (obj) => {
    if (!obj || !isString(obj) || !isDate(obj)) {
        throw new Error("Date is not formed well'");
    }
    return obj;
};
const isGender = (obj) => {
    return Object.values(types_1.Gender).includes(obj);
};
const parseGender = (obj) => {
    if (!obj || !isGender(obj)) {
        throw new Error("Gender is not formed well!");
    }
    return obj;
};
const isString = (obj) => {
    return typeof obj === "string" || obj instanceof String;
};
const parseString = (obj) => {
    if (!obj || !isString(obj)) {
        throw new Error("Object is not String!");
    }
    return obj;
};
const parseArray = (obj) => {
    return obj;
};
const isHealthCheckRating = (obj) => {
    console.log("values", Object.values(types_1.HealthCheckRating));
    return Object.values(types_1.HealthCheckRating).includes(obj);
};
const parseHealthCheckRating = (obj) => {
    console.log("gelen", obj);
    if (obj !== null && !isHealthCheckRating(obj)) {
        console.log("aman");
        throw new Error("HealthCheckRating is not formed well!");
    }
    console.log("normal");
    return obj;
};
function parseHospitalString(obj, type) {
    try {
        console.log("dogu");
        if (obj === type) {
            return obj;
        }
        console.log("noo");
        throw new Error("Object is not Hospital!");
    }
    catch (e) {
        console.log("noo2");
        throw new Error("Object is not String!");
    }
}
const parseHospital = (obj) => {
    return {
        id: parseString(obj.id),
        description: parseString(obj.description),
        date: parseString(obj.date),
        specialist: parseString(obj.specialist),
        type: parseHospitalString(obj.type, "Hospital"),
        discharge: {
            date: parseString(obj.discharge.date),
            criteria: parseString(obj.discharge.criteria)
        }
    };
};
function parseOccupationalHealthcareString(obj, type) {
    try {
        if (obj === type) {
            return obj;
        }
        throw new Error("Object is not OccupationalHealthcare!");
    }
    catch (e) {
        throw new Error("Object is not String!");
    }
}
const parseOccupationalHealthcare = (obj) => {
    return {
        id: parseString(obj.id),
        description: parseString(obj.description),
        date: parseString(obj.date),
        specialist: parseString(obj.specialist),
        type: parseOccupationalHealthcareString(obj.type, "OccupationalHealthcare"),
        employerName: parseString(obj.employerName)
    };
};
function parseHealthCheckString(obj, type) {
    try {
        if (obj === type) {
            console.log("yehu");
            return obj;
        }
        console.log("what");
        throw new Error("Object is not HealthCheck!");
    }
    catch (e) {
        throw new Error("Object is not String!");
    }
}
const parseHealthCheck = (obj) => {
    console.log("yes");
    return {
        id: parseString(obj.id),
        description: parseString(obj.description),
        date: parseString(obj.date),
        specialist: parseString(obj.specialist),
        type: parseHealthCheckString(obj.type, "HealthCheck"),
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
    };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toPatient = (object) => {
    return {
        name: parseString(object.name),
        ssn: parseString(object.ssn),
        occupation: parseString(object.occupation),
        gender: parseGender(object.gender),
        dateOfBirth: parseDate(object.dateOfBirth),
        entries: parseArray(object.entries)
    };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.toEntry = (object) => {
    if (object.type) {
        if (object.type === "Hospital") {
            console.log("hospital");
            return parseHospital(object);
        }
        else if (object.type === "OccupationalHealthcare") {
            return parseOccupationalHealthcare(object);
        }
        else if (object.type === "HealthCheck") {
            return parseHealthCheck(object);
        }
        throw new Error("Error in toEntry function");
    }
    throw new Error("Error in toEntry function");
};
exports.generateUniqueID = () => {
    const id = uuid_1.v4();
    if (!id || !isString(id)) {
        throw new Error("Object is not String!");
    }
    return id;
};
exports.default = toPatient;
