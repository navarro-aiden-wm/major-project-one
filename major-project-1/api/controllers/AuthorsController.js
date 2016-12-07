/**
 * AuthorsController
 *
 * @description :: Server-side logic for managing authors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    destroy: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id passed.');
        }

        Author.update(id, {isEnabled: false}).exec(function (err, user) {
            if (err) {
                return res.serverError(err);
            }

            return res.jsonx(user);
        });
    },

    create: function (req, res) {
        if (!req.body) {
            return res.badRequest('No body data passed.');
        }

        Author.create(req.body).exec(function (err, user) {
            if (err) {
                return res.serverError(err);
            }

            return res.jsonx(user);
        });
    },

    update: function (req, res) {
        if (!req.body) {
            return res.badRequest('No body data passed.');
        }

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id passed.');
        }

        Author.update(id, req.body).exec(function (err, user) {
            if (err) {
                return res.serverError(err);
            }

            return res.jsonx(user);
        });
    }

};
