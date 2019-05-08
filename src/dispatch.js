import {EventEmitter} from 'events';

let emitter = new EventEmitter();

export default {
    makePublisher: function(action) {
        return function(state) {
            emitter.emit(action, state);
        }
    },
    on: emitter.on.bind(emitter),
    publish: emitter.emit
}