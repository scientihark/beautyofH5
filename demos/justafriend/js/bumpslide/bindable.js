/**
 * bumpslide.Bindable
 *
 * This is an observable hash map that uses functional references (callbacks)
 * to notify of state changes
 *
 * @author David Knape, http://bumpslide.com/
 */

define(['underscore'], function (_) {

    // using underscore JS methods
    var each = _.each,
        indexOf = _.indexOf;

    // Can be called as a constructor or simply as a function to return a new Bindable instance
    var Bindable = function (props_obj) {
        if (false === (this instanceof Bindable)) return new Bindable(props_obj);
        this.props = props_obj || {};
        this.bindings = {};
        return this;
    };


    Bindable.prototype = {

        logEnabled:false,

        // set a named property on the hash map (props)
        // you can optionally pass in an object as the first param
        // and properties will be merged one at a time
        set:function (prop, new_val) {
            // handle object props
            if (typeof prop == 'object') {
                for (var p in prop) this.set(p, prop[p]);
                return;
            }
            var old_val = this.props[prop];
            if (!_.isEqual(old_val, new_val)) {
                this.props[prop] = new_val;
                this.notifyChanged(prop, old_val, new_val);
            }
        },

        notifyChanged:function (prop, old_val, new_val) {
            if (this.logEnabled) console.log('[Bindable] prop_change', prop, new_val);
            var callbacks = [];
            if (this.bindings[prop] !== undefined) callbacks = callbacks.concat(this.bindings[prop]);
            if (this.bindings['*'] !== undefined) callbacks = callbacks.concat(this.bindings['*']);
            _.each(callbacks, function (cb) {
                cb.call(null, new_val, old_val);
            });
        },

        notify:function (type, data) {
            _.each(this.bindings[type], function (cb) {
                cb.call(null, data);
            });
        },

        // get a named property from the hash map
        // optionally, provide a default val that will be returned if the property is undefined
        get:function (prop, default_val) {
            var val = this.props[prop];
            return (val === undefined) ? default_val : val;
        },

        // listen for property change events
        bind:function (prop, changeHandler, updateNow /* false */) {
            // create bindings map and prop-specific child array if it doesn't already exist
            this.bindings = this.bindings || {};
            this.bindings[ prop ] = this.bindings[ prop ] || [];

            // add the new change handler to this list
            this.bindings[ prop ].push(changeHandler);

            // If the updateNow flag is set, apply the binding right now
            if (updateNow === true) changeHandler.apply(null, [ this.props[prop], undefined ]);

            // return the function so we can do things like this...
            //
            //   var onChange = model.bind( 'sectionIndex', function(old_val, new_val) { });
            //   model.unbind( onChange );
            //
            return changeHandler;
        },

        // unbind a change handler
        // If no handler is specified, all handlers for that prop are removed
        unbind:function (prop, changeHandler /* opt */) {
            if (changeHandler === undefined) {
                // remove all bindings for this property
                this.bindings[prop] = [];
                return;
            }
            var handlers = this.bindings[prop];
            var idx = indexOf(handlers, changeHandler);
            if (idx !== -1) handlers.splice(idx, 1);
        },

        // remove all bindings
        unbindAll:function () {
            this.bindings = {}
        }
    }


    // A quick test...

    Bindable.Test = function () {
        var notes = [], m = new bumpslide.Bindable({ age:25, message:"Hello" });
        var onchange = function (age) {
            notes.push('age is now ' + age);
        };
        var hopefully = function (expr, msg) {
            if (expr) {
                //console.info('Test Passed: ', msg)
            } else {
                console.error('TEST FAILURE: ', msg);
            }
        }
        // test removable change handler
        m.bind('age', onchange);
        m.set('age', 20); //1
        m.set('age', 30); //2
        m.set('age', 30); // won't fire notification
        m.set('age', 40); //3
        hopefully(notes.length == 3, 'basic binding');
        m.unbind('age', onchange);
        m.set('age', 50); // won't fire notification
        hopefully(notes.length == 3, 'unbind handler');
        notes = [];
        // test inline handler
        m.bind('age', function (age) {
            notes.push('age is now ' + age);
        });
        m.set('age', 40);
        m.unbind('age');
        m.set('age', 50);
        hopefully(notes.length == 1, 'unbind all for prop');
    }


    return Bindable;


});