/*eslint-disable*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Command = $root.Command = (() => {

    /**
     * Properties of a Command.
     * @exports ICommand
     * @interface ICommand
     * @property {ISetConfigModeCommand|null} [setConfigModeCommand] Command setConfigModeCommand
     * @property {ISetNodeSettingsCommand|null} [setNodeSettingsCommand] Command setNodeSettingsCommand
     */

    /**
     * Constructs a new Command.
     * @exports Command
     * @classdesc Represents a Command.
     * @implements ICommand
     * @constructor
     * @param {ICommand=} [properties] Properties to set
     */
    function Command(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Command setConfigModeCommand.
     * @member {ISetConfigModeCommand|null|undefined} setConfigModeCommand
     * @memberof Command
     * @instance
     */
    Command.prototype.setConfigModeCommand = null;

    /**
     * Command setNodeSettingsCommand.
     * @member {ISetNodeSettingsCommand|null|undefined} setNodeSettingsCommand
     * @memberof Command
     * @instance
     */
    Command.prototype.setNodeSettingsCommand = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Command command.
     * @member {"setConfigModeCommand"|"setNodeSettingsCommand"|undefined} command
     * @memberof Command
     * @instance
     */
    Object.defineProperty(Command.prototype, "command", {
        get: $util.oneOfGetter($oneOfFields = ["setConfigModeCommand", "setNodeSettingsCommand"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Command instance using the specified properties.
     * @function create
     * @memberof Command
     * @static
     * @param {ICommand=} [properties] Properties to set
     * @returns {Command} Command instance
     */
    Command.create = function create(properties) {
        return new Command(properties);
    };

    /**
     * Encodes the specified Command message. Does not implicitly {@link Command.verify|verify} messages.
     * @function encode
     * @memberof Command
     * @static
     * @param {ICommand} message Command message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Command.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.setConfigModeCommand != null && Object.hasOwnProperty.call(message, "setConfigModeCommand"))
            $root.SetConfigModeCommand.encode(message.setConfigModeCommand, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.setNodeSettingsCommand != null && Object.hasOwnProperty.call(message, "setNodeSettingsCommand"))
            $root.SetNodeSettingsCommand.encode(message.setNodeSettingsCommand, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Command message, length delimited. Does not implicitly {@link Command.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Command
     * @static
     * @param {ICommand} message Command message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Command.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Command message from the specified reader or buffer.
     * @function decode
     * @memberof Command
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Command} Command
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Command.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Command();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.setConfigModeCommand = $root.SetConfigModeCommand.decode(reader, reader.uint32());
                break;
            case 2:
                message.setNodeSettingsCommand = $root.SetNodeSettingsCommand.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Command message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Command
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Command} Command
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Command.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Command message.
     * @function verify
     * @memberof Command
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Command.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.setConfigModeCommand != null && message.hasOwnProperty("setConfigModeCommand")) {
            properties.command = 1;
            {
                let error = $root.SetConfigModeCommand.verify(message.setConfigModeCommand);
                if (error)
                    return "setConfigModeCommand." + error;
            }
        }
        if (message.setNodeSettingsCommand != null && message.hasOwnProperty("setNodeSettingsCommand")) {
            if (properties.command === 1)
                return "command: multiple values";
            properties.command = 1;
            {
                let error = $root.SetNodeSettingsCommand.verify(message.setNodeSettingsCommand);
                if (error)
                    return "setNodeSettingsCommand." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Command message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Command
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Command} Command
     */
    Command.fromObject = function fromObject(object) {
        if (object instanceof $root.Command)
            return object;
        let message = new $root.Command();
        if (object.setConfigModeCommand != null) {
            if (typeof object.setConfigModeCommand !== "object")
                throw TypeError(".Command.setConfigModeCommand: object expected");
            message.setConfigModeCommand = $root.SetConfigModeCommand.fromObject(object.setConfigModeCommand);
        }
        if (object.setNodeSettingsCommand != null) {
            if (typeof object.setNodeSettingsCommand !== "object")
                throw TypeError(".Command.setNodeSettingsCommand: object expected");
            message.setNodeSettingsCommand = $root.SetNodeSettingsCommand.fromObject(object.setNodeSettingsCommand);
        }
        return message;
    };

    /**
     * Creates a plain object from a Command message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Command
     * @static
     * @param {Command} message Command
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Command.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.setConfigModeCommand != null && message.hasOwnProperty("setConfigModeCommand")) {
            object.setConfigModeCommand = $root.SetConfigModeCommand.toObject(message.setConfigModeCommand, options);
            if (options.oneofs)
                object.command = "setConfigModeCommand";
        }
        if (message.setNodeSettingsCommand != null && message.hasOwnProperty("setNodeSettingsCommand")) {
            object.setNodeSettingsCommand = $root.SetNodeSettingsCommand.toObject(message.setNodeSettingsCommand, options);
            if (options.oneofs)
                object.command = "setNodeSettingsCommand";
        }
        return object;
    };

    /**
     * Converts this Command to JSON.
     * @function toJSON
     * @memberof Command
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Command.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Command;
})();

export const SetConfigModeCommand = $root.SetConfigModeCommand = (() => {

    /**
     * Properties of a SetConfigModeCommand.
     * @exports ISetConfigModeCommand
     * @interface ISetConfigModeCommand
     * @property {boolean|null} [enabled] SetConfigModeCommand enabled
     */

    /**
     * Constructs a new SetConfigModeCommand.
     * @exports SetConfigModeCommand
     * @classdesc Represents a SetConfigModeCommand.
     * @implements ISetConfigModeCommand
     * @constructor
     * @param {ISetConfigModeCommand=} [properties] Properties to set
     */
    function SetConfigModeCommand(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SetConfigModeCommand enabled.
     * @member {boolean} enabled
     * @memberof SetConfigModeCommand
     * @instance
     */
    SetConfigModeCommand.prototype.enabled = false;

    /**
     * Creates a new SetConfigModeCommand instance using the specified properties.
     * @function create
     * @memberof SetConfigModeCommand
     * @static
     * @param {ISetConfigModeCommand=} [properties] Properties to set
     * @returns {SetConfigModeCommand} SetConfigModeCommand instance
     */
    SetConfigModeCommand.create = function create(properties) {
        return new SetConfigModeCommand(properties);
    };

    /**
     * Encodes the specified SetConfigModeCommand message. Does not implicitly {@link SetConfigModeCommand.verify|verify} messages.
     * @function encode
     * @memberof SetConfigModeCommand
     * @static
     * @param {ISetConfigModeCommand} message SetConfigModeCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SetConfigModeCommand.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.enabled);
        return writer;
    };

    /**
     * Encodes the specified SetConfigModeCommand message, length delimited. Does not implicitly {@link SetConfigModeCommand.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SetConfigModeCommand
     * @static
     * @param {ISetConfigModeCommand} message SetConfigModeCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SetConfigModeCommand.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SetConfigModeCommand message from the specified reader or buffer.
     * @function decode
     * @memberof SetConfigModeCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SetConfigModeCommand} SetConfigModeCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SetConfigModeCommand.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SetConfigModeCommand();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.enabled = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SetConfigModeCommand message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SetConfigModeCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SetConfigModeCommand} SetConfigModeCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SetConfigModeCommand.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SetConfigModeCommand message.
     * @function verify
     * @memberof SetConfigModeCommand
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SetConfigModeCommand.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.enabled != null && message.hasOwnProperty("enabled"))
            if (typeof message.enabled !== "boolean")
                return "enabled: boolean expected";
        return null;
    };

    /**
     * Creates a SetConfigModeCommand message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SetConfigModeCommand
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SetConfigModeCommand} SetConfigModeCommand
     */
    SetConfigModeCommand.fromObject = function fromObject(object) {
        if (object instanceof $root.SetConfigModeCommand)
            return object;
        let message = new $root.SetConfigModeCommand();
        if (object.enabled != null)
            message.enabled = Boolean(object.enabled);
        return message;
    };

    /**
     * Creates a plain object from a SetConfigModeCommand message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SetConfigModeCommand
     * @static
     * @param {SetConfigModeCommand} message SetConfigModeCommand
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SetConfigModeCommand.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.enabled = false;
        if (message.enabled != null && message.hasOwnProperty("enabled"))
            object.enabled = message.enabled;
        return object;
    };

    /**
     * Converts this SetConfigModeCommand to JSON.
     * @function toJSON
     * @memberof SetConfigModeCommand
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SetConfigModeCommand.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SetConfigModeCommand;
})();

export const SetNodeSettingsCommand = $root.SetNodeSettingsCommand = (() => {

    /**
     * Properties of a SetNodeSettingsCommand.
     * @exports ISetNodeSettingsCommand
     * @interface ISetNodeSettingsCommand
     * @property {string|null} [nodeName] SetNodeSettingsCommand nodeName
     * @property {string|null} [nodeContact] SetNodeSettingsCommand nodeContact
     * @property {number|null} [locationLat] SetNodeSettingsCommand locationLat
     * @property {number|null} [locationLong] SetNodeSettingsCommand locationLong
     * @property {string|null} [wifiPassword] SetNodeSettingsCommand wifiPassword
     * @property {number|null} [wakeInterval] SetNodeSettingsCommand wakeInterval
     */

    /**
     * Constructs a new SetNodeSettingsCommand.
     * @exports SetNodeSettingsCommand
     * @classdesc Represents a SetNodeSettingsCommand.
     * @implements ISetNodeSettingsCommand
     * @constructor
     * @param {ISetNodeSettingsCommand=} [properties] Properties to set
     */
    function SetNodeSettingsCommand(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SetNodeSettingsCommand nodeName.
     * @member {string} nodeName
     * @memberof SetNodeSettingsCommand
     * @instance
     */
    SetNodeSettingsCommand.prototype.nodeName = "";

    /**
     * SetNodeSettingsCommand nodeContact.
     * @member {string} nodeContact
     * @memberof SetNodeSettingsCommand
     * @instance
     */
    SetNodeSettingsCommand.prototype.nodeContact = "";

    /**
     * SetNodeSettingsCommand locationLat.
     * @member {number} locationLat
     * @memberof SetNodeSettingsCommand
     * @instance
     */
    SetNodeSettingsCommand.prototype.locationLat = 0;

    /**
     * SetNodeSettingsCommand locationLong.
     * @member {number} locationLong
     * @memberof SetNodeSettingsCommand
     * @instance
     */
    SetNodeSettingsCommand.prototype.locationLong = 0;

    /**
     * SetNodeSettingsCommand wifiPassword.
     * @member {string} wifiPassword
     * @memberof SetNodeSettingsCommand
     * @instance
     */
    SetNodeSettingsCommand.prototype.wifiPassword = "";

    /**
     * SetNodeSettingsCommand wakeInterval.
     * @member {number} wakeInterval
     * @memberof SetNodeSettingsCommand
     * @instance
     */
    SetNodeSettingsCommand.prototype.wakeInterval = 0;

    /**
     * Creates a new SetNodeSettingsCommand instance using the specified properties.
     * @function create
     * @memberof SetNodeSettingsCommand
     * @static
     * @param {ISetNodeSettingsCommand=} [properties] Properties to set
     * @returns {SetNodeSettingsCommand} SetNodeSettingsCommand instance
     */
    SetNodeSettingsCommand.create = function create(properties) {
        return new SetNodeSettingsCommand(properties);
    };

    /**
     * Encodes the specified SetNodeSettingsCommand message. Does not implicitly {@link SetNodeSettingsCommand.verify|verify} messages.
     * @function encode
     * @memberof SetNodeSettingsCommand
     * @static
     * @param {ISetNodeSettingsCommand} message SetNodeSettingsCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SetNodeSettingsCommand.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.nodeName != null && Object.hasOwnProperty.call(message, "nodeName"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.nodeName);
        if (message.nodeContact != null && Object.hasOwnProperty.call(message, "nodeContact"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.nodeContact);
        if (message.locationLat != null && Object.hasOwnProperty.call(message, "locationLat"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.locationLat);
        if (message.locationLong != null && Object.hasOwnProperty.call(message, "locationLong"))
            writer.uint32(/* id 4, wireType 5 =*/37).float(message.locationLong);
        if (message.wifiPassword != null && Object.hasOwnProperty.call(message, "wifiPassword"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.wifiPassword);
        if (message.wakeInterval != null && Object.hasOwnProperty.call(message, "wakeInterval"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.wakeInterval);
        return writer;
    };

    /**
     * Encodes the specified SetNodeSettingsCommand message, length delimited. Does not implicitly {@link SetNodeSettingsCommand.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SetNodeSettingsCommand
     * @static
     * @param {ISetNodeSettingsCommand} message SetNodeSettingsCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SetNodeSettingsCommand.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SetNodeSettingsCommand message from the specified reader or buffer.
     * @function decode
     * @memberof SetNodeSettingsCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SetNodeSettingsCommand} SetNodeSettingsCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SetNodeSettingsCommand.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SetNodeSettingsCommand();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.nodeName = reader.string();
                break;
            case 2:
                message.nodeContact = reader.string();
                break;
            case 3:
                message.locationLat = reader.float();
                break;
            case 4:
                message.locationLong = reader.float();
                break;
            case 5:
                message.wifiPassword = reader.string();
                break;
            case 6:
                message.wakeInterval = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SetNodeSettingsCommand message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SetNodeSettingsCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SetNodeSettingsCommand} SetNodeSettingsCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SetNodeSettingsCommand.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SetNodeSettingsCommand message.
     * @function verify
     * @memberof SetNodeSettingsCommand
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SetNodeSettingsCommand.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.nodeName != null && message.hasOwnProperty("nodeName"))
            if (!$util.isString(message.nodeName))
                return "nodeName: string expected";
        if (message.nodeContact != null && message.hasOwnProperty("nodeContact"))
            if (!$util.isString(message.nodeContact))
                return "nodeContact: string expected";
        if (message.locationLat != null && message.hasOwnProperty("locationLat"))
            if (typeof message.locationLat !== "number")
                return "locationLat: number expected";
        if (message.locationLong != null && message.hasOwnProperty("locationLong"))
            if (typeof message.locationLong !== "number")
                return "locationLong: number expected";
        if (message.wifiPassword != null && message.hasOwnProperty("wifiPassword"))
            if (!$util.isString(message.wifiPassword))
                return "wifiPassword: string expected";
        if (message.wakeInterval != null && message.hasOwnProperty("wakeInterval"))
            if (!$util.isInteger(message.wakeInterval))
                return "wakeInterval: integer expected";
        return null;
    };

    /**
     * Creates a SetNodeSettingsCommand message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SetNodeSettingsCommand
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SetNodeSettingsCommand} SetNodeSettingsCommand
     */
    SetNodeSettingsCommand.fromObject = function fromObject(object) {
        if (object instanceof $root.SetNodeSettingsCommand)
            return object;
        let message = new $root.SetNodeSettingsCommand();
        if (object.nodeName != null)
            message.nodeName = String(object.nodeName);
        if (object.nodeContact != null)
            message.nodeContact = String(object.nodeContact);
        if (object.locationLat != null)
            message.locationLat = Number(object.locationLat);
        if (object.locationLong != null)
            message.locationLong = Number(object.locationLong);
        if (object.wifiPassword != null)
            message.wifiPassword = String(object.wifiPassword);
        if (object.wakeInterval != null)
            message.wakeInterval = object.wakeInterval >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a SetNodeSettingsCommand message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SetNodeSettingsCommand
     * @static
     * @param {SetNodeSettingsCommand} message SetNodeSettingsCommand
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SetNodeSettingsCommand.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.nodeName = "";
            object.nodeContact = "";
            object.locationLat = 0;
            object.locationLong = 0;
            object.wifiPassword = "";
            object.wakeInterval = 0;
        }
        if (message.nodeName != null && message.hasOwnProperty("nodeName"))
            object.nodeName = message.nodeName;
        if (message.nodeContact != null && message.hasOwnProperty("nodeContact"))
            object.nodeContact = message.nodeContact;
        if (message.locationLat != null && message.hasOwnProperty("locationLat"))
            object.locationLat = options.json && !isFinite(message.locationLat) ? String(message.locationLat) : message.locationLat;
        if (message.locationLong != null && message.hasOwnProperty("locationLong"))
            object.locationLong = options.json && !isFinite(message.locationLong) ? String(message.locationLong) : message.locationLong;
        if (message.wifiPassword != null && message.hasOwnProperty("wifiPassword"))
            object.wifiPassword = message.wifiPassword;
        if (message.wakeInterval != null && message.hasOwnProperty("wakeInterval"))
            object.wakeInterval = message.wakeInterval;
        return object;
    };

    /**
     * Converts this SetNodeSettingsCommand to JSON.
     * @function toJSON
     * @memberof SetNodeSettingsCommand
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SetNodeSettingsCommand.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SetNodeSettingsCommand;
})();

export const Report = $root.Report = (() => {

    /**
     * Properties of a Report.
     * @exports IReport
     * @interface IReport
     * @property {INodeSettingsReport|null} [nodeSettingsReport] Report nodeSettingsReport
     */

    /**
     * Constructs a new Report.
     * @exports Report
     * @classdesc Represents a Report.
     * @implements IReport
     * @constructor
     * @param {IReport=} [properties] Properties to set
     */
    function Report(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Report nodeSettingsReport.
     * @member {INodeSettingsReport|null|undefined} nodeSettingsReport
     * @memberof Report
     * @instance
     */
    Report.prototype.nodeSettingsReport = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Report report.
     * @member {"nodeSettingsReport"|undefined} report
     * @memberof Report
     * @instance
     */
    Object.defineProperty(Report.prototype, "report", {
        get: $util.oneOfGetter($oneOfFields = ["nodeSettingsReport"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Report instance using the specified properties.
     * @function create
     * @memberof Report
     * @static
     * @param {IReport=} [properties] Properties to set
     * @returns {Report} Report instance
     */
    Report.create = function create(properties) {
        return new Report(properties);
    };

    /**
     * Encodes the specified Report message. Does not implicitly {@link Report.verify|verify} messages.
     * @function encode
     * @memberof Report
     * @static
     * @param {IReport} message Report message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Report.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.nodeSettingsReport != null && Object.hasOwnProperty.call(message, "nodeSettingsReport"))
            $root.NodeSettingsReport.encode(message.nodeSettingsReport, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Report message, length delimited. Does not implicitly {@link Report.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Report
     * @static
     * @param {IReport} message Report message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Report.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Report message from the specified reader or buffer.
     * @function decode
     * @memberof Report
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Report} Report
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Report.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Report();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.nodeSettingsReport = $root.NodeSettingsReport.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Report message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Report
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Report} Report
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Report.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Report message.
     * @function verify
     * @memberof Report
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Report.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.nodeSettingsReport != null && message.hasOwnProperty("nodeSettingsReport")) {
            properties.report = 1;
            {
                let error = $root.NodeSettingsReport.verify(message.nodeSettingsReport);
                if (error)
                    return "nodeSettingsReport." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Report message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Report
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Report} Report
     */
    Report.fromObject = function fromObject(object) {
        if (object instanceof $root.Report)
            return object;
        let message = new $root.Report();
        if (object.nodeSettingsReport != null) {
            if (typeof object.nodeSettingsReport !== "object")
                throw TypeError(".Report.nodeSettingsReport: object expected");
            message.nodeSettingsReport = $root.NodeSettingsReport.fromObject(object.nodeSettingsReport);
        }
        return message;
    };

    /**
     * Creates a plain object from a Report message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Report
     * @static
     * @param {Report} message Report
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Report.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.nodeSettingsReport != null && message.hasOwnProperty("nodeSettingsReport")) {
            object.nodeSettingsReport = $root.NodeSettingsReport.toObject(message.nodeSettingsReport, options);
            if (options.oneofs)
                object.report = "nodeSettingsReport";
        }
        return object;
    };

    /**
     * Converts this Report to JSON.
     * @function toJSON
     * @memberof Report
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Report.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Report;
})();

export const NodeSettingsReport = $root.NodeSettingsReport = (() => {

    /**
     * Properties of a NodeSettingsReport.
     * @exports INodeSettingsReport
     * @interface INodeSettingsReport
     * @property {string|null} [firmwareVersion] NodeSettingsReport firmwareVersion
     * @property {string|null} [nodeName] NodeSettingsReport nodeName
     * @property {string|null} [nodeContact] NodeSettingsReport nodeContact
     * @property {number|null} [locationLat] NodeSettingsReport locationLat
     * @property {number|null} [locationLong] NodeSettingsReport locationLong
     * @property {boolean|null} [wifiPasswordSet] NodeSettingsReport wifiPasswordSet
     * @property {number|null} [wakeInterval] NodeSettingsReport wakeInterval
     * @property {Uint8Array|null} [appEui] NodeSettingsReport appEui
     * @property {Uint8Array|null} [devEui] NodeSettingsReport devEui
     * @property {boolean|null} [appKeySet] NodeSettingsReport appKeySet
     * @property {boolean|null} [linkCheckEnabled] NodeSettingsReport linkCheckEnabled
     * @property {boolean|null} [adrEnabled] NodeSettingsReport adrEnabled
     * @property {number|null} [spreadingFactor] NodeSettingsReport spreadingFactor
     * @property {number|null} [txPower] NodeSettingsReport txPower
     */

    /**
     * Constructs a new NodeSettingsReport.
     * @exports NodeSettingsReport
     * @classdesc Represents a NodeSettingsReport.
     * @implements INodeSettingsReport
     * @constructor
     * @param {INodeSettingsReport=} [properties] Properties to set
     */
    function NodeSettingsReport(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * NodeSettingsReport firmwareVersion.
     * @member {string} firmwareVersion
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.firmwareVersion = "";

    /**
     * NodeSettingsReport nodeName.
     * @member {string} nodeName
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.nodeName = "";

    /**
     * NodeSettingsReport nodeContact.
     * @member {string} nodeContact
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.nodeContact = "";

    /**
     * NodeSettingsReport locationLat.
     * @member {number} locationLat
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.locationLat = 0;

    /**
     * NodeSettingsReport locationLong.
     * @member {number} locationLong
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.locationLong = 0;

    /**
     * NodeSettingsReport wifiPasswordSet.
     * @member {boolean} wifiPasswordSet
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.wifiPasswordSet = false;

    /**
     * NodeSettingsReport wakeInterval.
     * @member {number} wakeInterval
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.wakeInterval = 0;

    /**
     * NodeSettingsReport appEui.
     * @member {Uint8Array} appEui
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.appEui = $util.newBuffer([]);

    /**
     * NodeSettingsReport devEui.
     * @member {Uint8Array} devEui
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.devEui = $util.newBuffer([]);

    /**
     * NodeSettingsReport appKeySet.
     * @member {boolean} appKeySet
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.appKeySet = false;

    /**
     * NodeSettingsReport linkCheckEnabled.
     * @member {boolean} linkCheckEnabled
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.linkCheckEnabled = false;

    /**
     * NodeSettingsReport adrEnabled.
     * @member {boolean} adrEnabled
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.adrEnabled = false;

    /**
     * NodeSettingsReport spreadingFactor.
     * @member {number} spreadingFactor
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.spreadingFactor = 0;

    /**
     * NodeSettingsReport txPower.
     * @member {number} txPower
     * @memberof NodeSettingsReport
     * @instance
     */
    NodeSettingsReport.prototype.txPower = 0;

    /**
     * Creates a new NodeSettingsReport instance using the specified properties.
     * @function create
     * @memberof NodeSettingsReport
     * @static
     * @param {INodeSettingsReport=} [properties] Properties to set
     * @returns {NodeSettingsReport} NodeSettingsReport instance
     */
    NodeSettingsReport.create = function create(properties) {
        return new NodeSettingsReport(properties);
    };

    /**
     * Encodes the specified NodeSettingsReport message. Does not implicitly {@link NodeSettingsReport.verify|verify} messages.
     * @function encode
     * @memberof NodeSettingsReport
     * @static
     * @param {INodeSettingsReport} message NodeSettingsReport message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NodeSettingsReport.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.firmwareVersion != null && Object.hasOwnProperty.call(message, "firmwareVersion"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.firmwareVersion);
        if (message.nodeName != null && Object.hasOwnProperty.call(message, "nodeName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.nodeName);
        if (message.nodeContact != null && Object.hasOwnProperty.call(message, "nodeContact"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.nodeContact);
        if (message.locationLat != null && Object.hasOwnProperty.call(message, "locationLat"))
            writer.uint32(/* id 4, wireType 5 =*/37).float(message.locationLat);
        if (message.locationLong != null && Object.hasOwnProperty.call(message, "locationLong"))
            writer.uint32(/* id 5, wireType 5 =*/45).float(message.locationLong);
        if (message.wifiPasswordSet != null && Object.hasOwnProperty.call(message, "wifiPasswordSet"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.wifiPasswordSet);
        if (message.wakeInterval != null && Object.hasOwnProperty.call(message, "wakeInterval"))
            writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.wakeInterval);
        if (message.appEui != null && Object.hasOwnProperty.call(message, "appEui"))
            writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.appEui);
        if (message.devEui != null && Object.hasOwnProperty.call(message, "devEui"))
            writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.devEui);
        if (message.appKeySet != null && Object.hasOwnProperty.call(message, "appKeySet"))
            writer.uint32(/* id 10, wireType 0 =*/80).bool(message.appKeySet);
        if (message.linkCheckEnabled != null && Object.hasOwnProperty.call(message, "linkCheckEnabled"))
            writer.uint32(/* id 11, wireType 0 =*/88).bool(message.linkCheckEnabled);
        if (message.adrEnabled != null && Object.hasOwnProperty.call(message, "adrEnabled"))
            writer.uint32(/* id 12, wireType 0 =*/96).bool(message.adrEnabled);
        if (message.spreadingFactor != null && Object.hasOwnProperty.call(message, "spreadingFactor"))
            writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.spreadingFactor);
        if (message.txPower != null && Object.hasOwnProperty.call(message, "txPower"))
            writer.uint32(/* id 14, wireType 0 =*/112).sint32(message.txPower);
        return writer;
    };

    /**
     * Encodes the specified NodeSettingsReport message, length delimited. Does not implicitly {@link NodeSettingsReport.verify|verify} messages.
     * @function encodeDelimited
     * @memberof NodeSettingsReport
     * @static
     * @param {INodeSettingsReport} message NodeSettingsReport message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NodeSettingsReport.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a NodeSettingsReport message from the specified reader or buffer.
     * @function decode
     * @memberof NodeSettingsReport
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {NodeSettingsReport} NodeSettingsReport
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NodeSettingsReport.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NodeSettingsReport();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.firmwareVersion = reader.string();
                break;
            case 2:
                message.nodeName = reader.string();
                break;
            case 3:
                message.nodeContact = reader.string();
                break;
            case 4:
                message.locationLat = reader.float();
                break;
            case 5:
                message.locationLong = reader.float();
                break;
            case 6:
                message.wifiPasswordSet = reader.bool();
                break;
            case 7:
                message.wakeInterval = reader.uint32();
                break;
            case 8:
                message.appEui = reader.bytes();
                break;
            case 9:
                message.devEui = reader.bytes();
                break;
            case 10:
                message.appKeySet = reader.bool();
                break;
            case 11:
                message.linkCheckEnabled = reader.bool();
                break;
            case 12:
                message.adrEnabled = reader.bool();
                break;
            case 13:
                message.spreadingFactor = reader.uint32();
                break;
            case 14:
                message.txPower = reader.sint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a NodeSettingsReport message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof NodeSettingsReport
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {NodeSettingsReport} NodeSettingsReport
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NodeSettingsReport.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a NodeSettingsReport message.
     * @function verify
     * @memberof NodeSettingsReport
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    NodeSettingsReport.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.firmwareVersion != null && message.hasOwnProperty("firmwareVersion"))
            if (!$util.isString(message.firmwareVersion))
                return "firmwareVersion: string expected";
        if (message.nodeName != null && message.hasOwnProperty("nodeName"))
            if (!$util.isString(message.nodeName))
                return "nodeName: string expected";
        if (message.nodeContact != null && message.hasOwnProperty("nodeContact"))
            if (!$util.isString(message.nodeContact))
                return "nodeContact: string expected";
        if (message.locationLat != null && message.hasOwnProperty("locationLat"))
            if (typeof message.locationLat !== "number")
                return "locationLat: number expected";
        if (message.locationLong != null && message.hasOwnProperty("locationLong"))
            if (typeof message.locationLong !== "number")
                return "locationLong: number expected";
        if (message.wifiPasswordSet != null && message.hasOwnProperty("wifiPasswordSet"))
            if (typeof message.wifiPasswordSet !== "boolean")
                return "wifiPasswordSet: boolean expected";
        if (message.wakeInterval != null && message.hasOwnProperty("wakeInterval"))
            if (!$util.isInteger(message.wakeInterval))
                return "wakeInterval: integer expected";
        if (message.appEui != null && message.hasOwnProperty("appEui"))
            if (!(message.appEui && typeof message.appEui.length === "number" || $util.isString(message.appEui)))
                return "appEui: buffer expected";
        if (message.devEui != null && message.hasOwnProperty("devEui"))
            if (!(message.devEui && typeof message.devEui.length === "number" || $util.isString(message.devEui)))
                return "devEui: buffer expected";
        if (message.appKeySet != null && message.hasOwnProperty("appKeySet"))
            if (typeof message.appKeySet !== "boolean")
                return "appKeySet: boolean expected";
        if (message.linkCheckEnabled != null && message.hasOwnProperty("linkCheckEnabled"))
            if (typeof message.linkCheckEnabled !== "boolean")
                return "linkCheckEnabled: boolean expected";
        if (message.adrEnabled != null && message.hasOwnProperty("adrEnabled"))
            if (typeof message.adrEnabled !== "boolean")
                return "adrEnabled: boolean expected";
        if (message.spreadingFactor != null && message.hasOwnProperty("spreadingFactor"))
            if (!$util.isInteger(message.spreadingFactor))
                return "spreadingFactor: integer expected";
        if (message.txPower != null && message.hasOwnProperty("txPower"))
            if (!$util.isInteger(message.txPower))
                return "txPower: integer expected";
        return null;
    };

    /**
     * Creates a NodeSettingsReport message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof NodeSettingsReport
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {NodeSettingsReport} NodeSettingsReport
     */
    NodeSettingsReport.fromObject = function fromObject(object) {
        if (object instanceof $root.NodeSettingsReport)
            return object;
        let message = new $root.NodeSettingsReport();
        if (object.firmwareVersion != null)
            message.firmwareVersion = String(object.firmwareVersion);
        if (object.nodeName != null)
            message.nodeName = String(object.nodeName);
        if (object.nodeContact != null)
            message.nodeContact = String(object.nodeContact);
        if (object.locationLat != null)
            message.locationLat = Number(object.locationLat);
        if (object.locationLong != null)
            message.locationLong = Number(object.locationLong);
        if (object.wifiPasswordSet != null)
            message.wifiPasswordSet = Boolean(object.wifiPasswordSet);
        if (object.wakeInterval != null)
            message.wakeInterval = object.wakeInterval >>> 0;
        if (object.appEui != null)
            if (typeof object.appEui === "string")
                $util.base64.decode(object.appEui, message.appEui = $util.newBuffer($util.base64.length(object.appEui)), 0);
            else if (object.appEui.length)
                message.appEui = object.appEui;
        if (object.devEui != null)
            if (typeof object.devEui === "string")
                $util.base64.decode(object.devEui, message.devEui = $util.newBuffer($util.base64.length(object.devEui)), 0);
            else if (object.devEui.length)
                message.devEui = object.devEui;
        if (object.appKeySet != null)
            message.appKeySet = Boolean(object.appKeySet);
        if (object.linkCheckEnabled != null)
            message.linkCheckEnabled = Boolean(object.linkCheckEnabled);
        if (object.adrEnabled != null)
            message.adrEnabled = Boolean(object.adrEnabled);
        if (object.spreadingFactor != null)
            message.spreadingFactor = object.spreadingFactor >>> 0;
        if (object.txPower != null)
            message.txPower = object.txPower | 0;
        return message;
    };

    /**
     * Creates a plain object from a NodeSettingsReport message. Also converts values to other types if specified.
     * @function toObject
     * @memberof NodeSettingsReport
     * @static
     * @param {NodeSettingsReport} message NodeSettingsReport
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    NodeSettingsReport.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.firmwareVersion = "";
            object.nodeName = "";
            object.nodeContact = "";
            object.locationLat = 0;
            object.locationLong = 0;
            object.wifiPasswordSet = false;
            object.wakeInterval = 0;
            if (options.bytes === String)
                object.appEui = "";
            else {
                object.appEui = [];
                if (options.bytes !== Array)
                    object.appEui = $util.newBuffer(object.appEui);
            }
            if (options.bytes === String)
                object.devEui = "";
            else {
                object.devEui = [];
                if (options.bytes !== Array)
                    object.devEui = $util.newBuffer(object.devEui);
            }
            object.appKeySet = false;
            object.linkCheckEnabled = false;
            object.adrEnabled = false;
            object.spreadingFactor = 0;
            object.txPower = 0;
        }
        if (message.firmwareVersion != null && message.hasOwnProperty("firmwareVersion"))
            object.firmwareVersion = message.firmwareVersion;
        if (message.nodeName != null && message.hasOwnProperty("nodeName"))
            object.nodeName = message.nodeName;
        if (message.nodeContact != null && message.hasOwnProperty("nodeContact"))
            object.nodeContact = message.nodeContact;
        if (message.locationLat != null && message.hasOwnProperty("locationLat"))
            object.locationLat = options.json && !isFinite(message.locationLat) ? String(message.locationLat) : message.locationLat;
        if (message.locationLong != null && message.hasOwnProperty("locationLong"))
            object.locationLong = options.json && !isFinite(message.locationLong) ? String(message.locationLong) : message.locationLong;
        if (message.wifiPasswordSet != null && message.hasOwnProperty("wifiPasswordSet"))
            object.wifiPasswordSet = message.wifiPasswordSet;
        if (message.wakeInterval != null && message.hasOwnProperty("wakeInterval"))
            object.wakeInterval = message.wakeInterval;
        if (message.appEui != null && message.hasOwnProperty("appEui"))
            object.appEui = options.bytes === String ? $util.base64.encode(message.appEui, 0, message.appEui.length) : options.bytes === Array ? Array.prototype.slice.call(message.appEui) : message.appEui;
        if (message.devEui != null && message.hasOwnProperty("devEui"))
            object.devEui = options.bytes === String ? $util.base64.encode(message.devEui, 0, message.devEui.length) : options.bytes === Array ? Array.prototype.slice.call(message.devEui) : message.devEui;
        if (message.appKeySet != null && message.hasOwnProperty("appKeySet"))
            object.appKeySet = message.appKeySet;
        if (message.linkCheckEnabled != null && message.hasOwnProperty("linkCheckEnabled"))
            object.linkCheckEnabled = message.linkCheckEnabled;
        if (message.adrEnabled != null && message.hasOwnProperty("adrEnabled"))
            object.adrEnabled = message.adrEnabled;
        if (message.spreadingFactor != null && message.hasOwnProperty("spreadingFactor"))
            object.spreadingFactor = message.spreadingFactor;
        if (message.txPower != null && message.hasOwnProperty("txPower"))
            object.txPower = message.txPower;
        return object;
    };

    /**
     * Converts this NodeSettingsReport to JSON.
     * @function toJSON
     * @memberof NodeSettingsReport
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    NodeSettingsReport.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return NodeSettingsReport;
})();

export { $root as default };
