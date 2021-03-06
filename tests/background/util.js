'use strict';

/**
 * Tests for 'util' (background) module.
 */

const expect = require('chai').expect;
const Util = require('../../src/core/background/util/util');

const scrobblePercent = 50;

const HIDE_STRING_IN_TEXT_DATA = [{
	description: 'should hide string in text',
	args: ['SAMPLE', 'This is a SAMPLE string'],
	expected: 'This is a ****** string'
}, {
	description: 'should do nothing if string is null',
	args: [null, 'This is a SAMPLE string'],
	expected: 'This is a SAMPLE string'
}, {
	description: 'should do nothing if string is empty',
	args: ['', 'This is a SAMPLE string'],
	expected: 'This is a SAMPLE string'
}, {
	description: 'should not fall on null source string',
	args: [null, null],
	expected: null
}, {
	description: 'should not fall on empty source string',
	args: ['', ''],
	expected: '',
}];

const HIDE_OBJECT_VALUE_DATA = [{
	description: 'should hide string',
	args: ['Sensitive'],
	expected: '*********'
}, {
	description: 'should hide array, but display array length',
	args: [[1, 2, 3]],
	expected: '[Array(3)]'
}, {
	description: 'should hide object with generic placeholder',
	args: [{ 1: 1, 2: 2 }],
	expected: Util.HIDDEN_PLACEHOLDER
}, {
	description: 'should display null as is',
	args: [undefined],
	expected: undefined
}, {
	description: 'should display null as is',
	args: [null],
	expected: null
}, {
	description: 'should display empty string as is',
	args: [''],
	expected: ''
}];

const GET_SECONDS_TO_SCROBBLE_DATA = [{
	description: 'should return min time if duration is zero',
	args: [0, scrobblePercent],
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return min time if duration is null',
	args: [null, scrobblePercent],
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return min time if duration type is not number',
	args: ['duration', scrobblePercent],
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return min time if duration is NaN',
	args: [NaN, scrobblePercent],
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return min time if duration is +Infinity',
	args: [Infinity, scrobblePercent],
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return min time if duration is -Infinity',
	args: [-Infinity, scrobblePercent],
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return -1 for short songs',
	args: [Util.MIN_TRACK_DURATION - 1, scrobblePercent],
	expected: -1
}, {
	description: 'should return half of song duration',
	args: [190, scrobblePercent],
	expected: 95
}, {
	description: 'should return max time for long songs',
	args: [Util.MAX_SCROBBLE_TIME * 2 + 1, scrobblePercent],
	expected: Util.MAX_SCROBBLE_TIME
}];

/**
 * Run all tests.
 */
function runTests() {
	describe('hideObjectValue', testHideObjectValue);
	describe('hideStringInText', testHideStringInText);
	describe('getSecondsToScrobble', testGetSecondsToScrobble);
}

/**
 * Test generic function.
 * @param  {Function} func Function to test
 * @param  {Object} testData Test data
 */
function testFunction(func, testData) {
	for (const data of testData) {
		const { description, args, expected } = data;
		const actual = func(...args);

		it(description, () => {
			expect(actual).to.be.equal(expected);
		});
	}
}

/**
 * Test 'Util.hideStringInText' function.
 */
function testHideStringInText() {
	testFunction(Util.hideStringInText, HIDE_STRING_IN_TEXT_DATA);
}

/**
 * Test 'Util.hideString' function.
 */
function testHideObjectValue() {
	testFunction(Util.hideObjectValue, HIDE_OBJECT_VALUE_DATA);
}

/**
 * Test 'Util.getSecondsToScrobble' function.
 */
function testGetSecondsToScrobble() {
	testFunction(Util.getSecondsToScrobble, GET_SECONDS_TO_SCROBBLE_DATA);
}

runTests();
