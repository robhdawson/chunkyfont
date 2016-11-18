'use strict';

const $ = require('jquery');
const _ = require('lodash');

const font = require('./font');

const starters = [
    'hey!',
    'frogs',
    'conga',
    'why',
];

$(document).ready(function() {
    const $input = $('[data-input]');
    const $char = $('[data-char]');
    const $filler = $('[data-filler]');

    $char.val('X');
    $filler.val(' ');

    const $go = $('[data-go]');

    const $output = $('[data-output]');

    function values() {
        return {
            text: $input.val(),
            char: $char.val() || 'X',
            filler: $filler.val() || ' ',
        };
    }

    function go(noselect = false) {
        const stuff = values();

        const letters = [];

        stuff.text.toLowerCase().split('').forEach(function(c) {
            const bigBoy = font[c];

            if (!bigBoy || bigBoy.length !== 5) {
                throw `Hey! "${c}" is missing from the font, or it's invalid.`;
            }

            letters.push(bigBoy);
        });

        const layout = $('input[name="layout"]:checked').attr('value');
        let output;

        if (layout === 'vertical') {
            const rows = [];
            letters.forEach(function(letter, i) {
                letter.forEach(function(row) {
                    rows.push(row);
                });

                if (i < letters.length - 1) {
                    rows.push('     ');
                }
            });

            output = rows.join('\n');
        } else {
            const rows = [[], [], [], [], []];

            letters.forEach(function(letter) {
                letter.forEach(function(row, i) {
                    rows[i].push(row);
                });
            });

            output = rows.map(function(row) {
                return row.join(' ');
            }).join('\n');
        }

        output = output.replace(/X/g, stuff.char);
        output = output.replace(/ /g, stuff.filler);

        $output.text(output);

        if (!noselect) {
            $output.focus().select();
        }
    }

    $go.on('click', function() {
        go();
    });

    $input.val(_.sample(starters));
    go(true);
});
