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

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Command command.
     * @member {"setConfigModeCommand"|undefined} command
     * @memberof Command
     * @instance
     */
    Object.defineProperty(Command.prototype, "command", {
        get: $util.oneOfGetter($oneOfFields = ["setConfigModeCommand"]),
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

export { $root as default };
