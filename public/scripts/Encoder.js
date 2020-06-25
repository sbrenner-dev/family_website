class Encoder {
    constructor() {
        this.enc_map = new Map();

        this.enc_map.set("?", "questionmark");
        this.enc_map.set("\/", "Forwardslash");
        this.enc_map.set("%", "percentagesymb");
        this.enc_map.set("\"", "quotationmark");
        this.enc_map.set("\\", "ackslash");
    }

    encode(str) {
        if (typeof str !== "string") {
            throw 'Parameter must be a string';
        }
        for (let [key, value] of this.enc_map.entries()) {
            let regex = new RegExp("\\" + key, "gi");
            str = str.replace(regex, value);
        }
        return str;
    }

    decode(str) {
        if (typeof str !== "string") {
            throw 'Parameter must be a string';
        } else {
            for (let [key, value] of this.enc_map.entries()) {
                let regex = new RegExp("\\" + value, "gi");
                str = str.replace(regex, key);
            }
        }

        return str;
    }
}

module.exports = Encoder;