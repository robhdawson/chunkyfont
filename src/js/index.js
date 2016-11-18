'use strict';

const $ = require('jquery');

const font = require('./font');

$(document).ready(function() {
    const $input = $('[data-input]');
    const $char = $('[data-char]');
    const $filler = $('[data-filler]');

    const $go = $('[data-go]');

    const $output = $('[data-output]');

    function values() {
        return {
            text: $input.val(),
            char: $char.val() || 'X',
            filler: $filler.val() || ' ',
        };
    }

    function go() {
        const stuff = values();

        const rows = [[], [], [], [], []];

        stuff.text.toLowerCase().split('').forEach(function(c) {
            const bigBoy = font[c];

            if (!bigBoy || bigBoy.length !== 5) {
                throw `Hey! "${c}" is missing from the font, or it's invalid.`;
            }

            bigBoy.forEach(function(s, i) {
                rows[i].push(s);
            });
        });

        let output = rows.map(function(row) {
            return row.join(' ');
        }).join('\n');

        output = output.replace(/X/g, stuff.char);
        output = output.replace(/ /g, stuff.filler);

        $output.text(output);
        $output.focus().select();
    }

    $go.on('click', go);
});
