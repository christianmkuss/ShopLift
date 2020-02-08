const createEventTarget = () => {
    function EventTarget() {
        this.listeners = {};
    }
    EventTarget.prototype = {
        addEventListener: function(type, callback) {
            console.log('Adding event' + type);
            if (!(type in this.listeners)) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(callback);
            console.log(this.listeners);
        },
        removeEventListener: function(type, callback) {
            if (!(type in this.listeners)) {
                return;
            }
            const stack = this.listeners[type];
            for (let i = 0, l = stack.length; i < l; i++) {
                if (stack[i] === callback) {
                    stack.splice(i, 1);
                    return;
                }
            }
        },
        dispatchEvent: function(event) {
            console.log(this.listeners);
            if (!(event.type in this.listeners)) {
                return true;
            }
            const stack = this.listeners[event.type].slice();

            for (let i = 0, l = stack.length; i < l; i++) {
                stack[i].call(this, event);
            }
            return !event.defaultPrevented;
        }
    };

    return new EventTarget();
};

export let one = new EventTarget();
