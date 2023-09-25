// Derives a password from a scret + uri.
// The derived password string will be passed to the callback function as the
// only argument.
function zpass3(secret, uri) {
    // Uint8Array
    var salt = [
        31, 158, 75, 14, 65, 252, 216, 116, 202, 114, 49, 243, 24, 202, 172, 122,
        146, 35, 3, 148, 21, 76, 245, 179, 164, 227, 192, 127, 144, 111, 141, 205,
        195, 61, 76, 52, 38, 16, 82, 109, 230, 191, 1, 247, 167, 66, 72, 153, 93,
        253, 206, 91, 162, 230, 187, 253, 72, 106, 246, 142, 27, 201, 190, 44, 179,
        130, 224, 245, 241, 229, 79, 135, 127, 78, 191, 71, 33, 28, 234, 78, 248,
        57, 252, 43, 156, 130, 207, 126, 218, 89, 48, 93, 42, 47, 240, 167, 69, 10,
        193, 116, 234, 187, 231, 55, 140, 6, 191, 63, 88, 213, 67, 241, 174, 126,
        236, 13, 72, 142, 163, 53, 177, 108, 177, 87, 44, 134, 77, 93
    ]

    var res = secret+'@'+uri;

    // scrypt configuration
    var N = 1 << 12;  // CPU cost
    var r = 1 << 3;   // Memory cost
    var p = 2;        // parallelization cost
    var dkLen = 32;

    do {
        var password = new buffer.Buffer(res.normalize('NFKD'), 'utf8');
        var key = scrypt(password, salt, N, r, p, dkLen);
        key = new buffer.Buffer(key);
        res = postProcess(key);
    } while(!checkComplexity(res));
    return res;
}

// Ensures that the derived password complies to the requirements of diversity
// and length.
function postProcess(key) {
    key = encodeBytes(key);
    key = key.slice(0,20);
    return key;
}

// byteArray should be an array of UInt8.
function encodeBytes(byteArray) {
    // 256 unique pairs of chars.
    // Each pair is formed by two chars from a set of 64 chars.
    // Each char is represented in exactly 8 pairs.
    const dictionary = [
        'a?', 'b!', 'c9', 'd8', 'e7', 'f6', 'g5', 'h4', 'i3', 'j2', 'k1', 'l0',
        'mZ', 'nY', 'oX', 'pW', 'qV', 'rU', 'sT', 'tS', 'uR', 'vQ', 'wP', 'xO',
        'yN', 'zM', 'AL', 'BK', 'CJ', 'DI', 'EH', 'FG', 'GF', 'HE', 'ID', 'JC',
        'KB', 'LA', 'Mz', 'Ny', 'Ox', 'Pw', 'Qv', 'Ru', 'St', 'Ts', 'Ur', 'Vq',
        'Wp', 'Xo', 'Yn', 'Zm', '0l', '1k', '2j', '3i', '4h', '5g', '6f', '7e',
        '8d', '9c', '!b', '?a', 'aG', 'bH', 'cI', 'dJ', 'eK', 'fL', 'gM', 'hN',
        'iO', 'jP', 'kQ', 'lR', 'mS', 'nT', 'oU', 'pV', 'qW', 'rX', 'sY', 'tZ',
        'u0', 'v1', 'w2', 'x3', 'y4', 'z5', 'A6', 'B7', 'C8', 'D9', 'E!', 'F?',
        'Ga', 'Hb', 'Ic', 'Jd', 'Ke', 'Lf', 'Mg', 'Nh', 'Oi', 'Pj', 'Qk', 'Rl',
        'Sm', 'Tn', 'Uo', 'Vp', 'Wq', 'Xr', 'Ys', 'Zt', '0u', '1v', '2w', '3x',
        '4y', '5z', '6A', '7B', '8C', '9D', '!E', '?F', '?G', '!H', '9I', '8J',
        '7K', '6L', '5M', '4N', '3O', '2P', '1Q', '0R', 'ZS', 'YT', 'XU', 'WV',
        'VW', 'UX', 'TY', 'SZ', 'R0', 'Q1', 'P2', 'O3', 'N4', 'M5', 'L6', 'K7', 
        'J8', 'I9', 'H!', 'G?', 'Fa', 'Eb', 'Dc', 'Cd', 'Be', 'Af', 'zg', 'yh', 
        'xi', 'wj', 'vk', 'ul', 'tm', 'sn', 'ro', 'qp', 'pq', 'or', 'ns', 'mt', 
        'lu', 'kv', 'jw', 'ix', 'hy', 'gz', 'fA', 'eB', 'dC', 'cD', 'bE', 'aF', 
        'qa', 'rb', 'sc', 'td', 'ue', 'vf', 'wg', 'xh', 'yi', 'zj', 'Ak', 'Bl', 
        'Cm', 'Dn', 'Eo', 'Fp', 'Gq', 'Hr', 'Is', 'Jt', 'Ku', 'Lv', 'Mw', 'Nx', 
        'Oy', 'Pz', 'QA', 'RB', 'SC', 'TD', 'UE', 'VF', 'WG', 'XH', 'YI', 'ZJ', 
        '0K', '1L', '2M', '3N', '4O', '5P', '6Q', '7R', '8S', '9T', '!U', '?V', 
        'aW', 'bX', 'cY', 'dZ', 'e0', 'f1', 'g2', 'h3', 'i4', 'j5', 'k6', 'l7', 
        'm8', 'n9', 'o!', 'p?'
    ];
    var str = '';
    for (i=0; i < byteArray.length; i++) {
        str = str + dictionary[byteArray[i]];
    }
    return str;
}

function checkComplexity(text) {
    var hasNumber = /\d/;
    var hasUpper = /[A-Z]/;
    var hasLower = /[a-z]/;
    var hasSymbol = /(!|\?)/;
    return hasNumber.test(text) && hasUpper.test(text) && hasLower.test(text) && hasSymbol.test(text);    
}

module.exports = { checkComplexity, encodeBytes }
