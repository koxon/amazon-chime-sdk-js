"use strict";
// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DemoMeetingApp = exports.ContentShareType = void 0;
require("./styleV2.scss");
require("bootstrap");
var index_1 = require("../../../../src/index");
var DemoTileOrganizer = /** @class */ (function () {
    function DemoTileOrganizer() {
        this.tiles = {};
        this.tileStates = {};
    }
    DemoTileOrganizer.prototype.acquireTileIndex = function (tileId, isLocalTile) {
        for (var index = 0; index <= DemoTileOrganizer.MAX_TILES; index++) {
            if (this.tiles[index] === tileId) {
                return index;
            }
        }
        for (var index = 0; index <= DemoTileOrganizer.MAX_TILES; index++) {
            if (!(index in this.tiles)) {
                if (isLocalTile) {
                    this.tiles[DemoTileOrganizer.LOCAL_VIDEO_INDEX] = tileId;
                    return DemoTileOrganizer.LOCAL_VIDEO_INDEX;
                }
                this.tiles[index] = tileId;
                return index;
            }
        }
        throw new Error('no tiles are available');
    };
    DemoTileOrganizer.prototype.releaseTileIndex = function (tileId) {
        for (var index = 0; index <= DemoTileOrganizer.MAX_TILES; index++) {
            if (this.tiles[index] === tileId) {
                delete this.tiles[index];
                return index;
            }
        }
        return DemoTileOrganizer.MAX_TILES;
    };
    // this is index instead of length
    DemoTileOrganizer.MAX_TILES = 4;
    DemoTileOrganizer.LOCAL_VIDEO_INDEX = 0;
    return DemoTileOrganizer;
}());
var TestSound = /** @class */ (function () {
    function TestSound(sinkId, frequency, durationSec, rampSec, maxGainValue) {
        if (frequency === void 0) { frequency = 440; }
        if (durationSec === void 0) { durationSec = 1; }
        if (rampSec === void 0) { rampSec = 0.1; }
        if (maxGainValue === void 0) { maxGainValue = 0.1; }
        // @ts-ignore
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        var gainNode = audioContext.createGain();
        gainNode.gain.value = 0;
        var oscillatorNode = audioContext.createOscillator();
        oscillatorNode.frequency.value = frequency;
        oscillatorNode.connect(gainNode);
        var destinationStream = audioContext.createMediaStreamDestination();
        gainNode.connect(destinationStream);
        var currentTime = audioContext.currentTime;
        var startTime = currentTime + 0.1;
        gainNode.gain.linearRampToValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(maxGainValue, startTime + rampSec);
        gainNode.gain.linearRampToValueAtTime(maxGainValue, startTime + rampSec + durationSec);
        gainNode.gain.linearRampToValueAtTime(0, startTime + rampSec * 2 + durationSec);
        oscillatorNode.start();
        var audioMixController = new index_1.DefaultAudioMixController();
        // @ts-ignore
        audioMixController.bindAudioDevice({ deviceId: sinkId });
        audioMixController.bindAudioElement(new Audio());
        audioMixController.bindAudioStream(destinationStream.stream);
        new index_1.TimeoutScheduler((rampSec * 2 + durationSec + 1) * 1000).start(function () {
            audioContext.close();
        });
    }
    return TestSound;
}());
var ContentShareType;
(function (ContentShareType) {
    ContentShareType[ContentShareType["ScreenCapture"] = 0] = "ScreenCapture";
    ContentShareType[ContentShareType["VideoFile"] = 1] = "VideoFile";
})(ContentShareType = exports.ContentShareType || (exports.ContentShareType = {}));
;
var DemoMeetingApp = /** @class */ (function () {
    function DemoMeetingApp() {
        var _this = this;
        this.showActiveSpeakerScores = false;
        this.activeSpeakerLayout = true;
        this.meeting = null;
        this.name = null;
        this.voiceConnectorId = null;
        this.sipURI = null;
        this.region = null;
        this.meetingSession = null;
        this.audioVideo = null;
        this.tileOrganizer = new DemoTileOrganizer();
        this.canStartLocalVideo = true;
        // eslint-disable-next-line
        this.roster = {};
        this.tileIndexToTileId = {};
        this.tileIdToTileIndex = {};
        this.cameraDeviceIds = [];
        this.microphoneDeviceIds = [];
        this.buttonStates = {
            'button-microphone': true,
            'button-camera': false,
            'button-speaker': true,
            'button-content-share': false,
            'button-pause-content-share': false
        };
        this.contentShareType = ContentShareType.ScreenCapture;
        // feature flags
        this.enableWebAudio = false;
        this.enableUnifiedPlanForChromiumBasedBrowsers = true;
        this.enableSimulcast = false;
        this.markdown = require('markdown-it')({ linkify: true });
        this.lastMessageSender = null;
        this.lastReceivedMessageTimestamp = 0;
        this.analyserNodeCallback = function () { };
        this.selectedVideoInput = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        global.app = this;
        document.getElementById('sdk-version').innerText =
            "amazon-chime-sdk-js@" + index_1.Versioning.sdkVersion;
        this.initEventListeners();
        this.initParameters();
        this.setMediaRegion();
        this.setUpVideoTileElementResizer();
        if (this.isRecorder() || this.isBroadcaster()) {
            new index_1.AsyncScheduler().start(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.meeting = new URL(window.location.href).searchParams.get('m');
                            this.name = this.isRecorder() ? '«Meeting Recorder»' : '«Meeting Broadcaster»';
                            return [4 /*yield*/, this.authenticate()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.join()];
                        case 2:
                            _a.sent();
                            this.displayButtonStates();
                            console.error("GO NONE");
                            this.noneElement('meeting-controls');
                            this.noneElement('roster-message-container');
                            console.error("END NONE");
                            this.switchToFlow('flow-meeting');
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        else {
            this.switchToFlow('flow-authenticate');
        }
    }
    DemoMeetingApp.prototype.initParameters = function () {
        var meeting = new URL(window.location.href).searchParams.get('m');
        if (meeting) {
            document.getElementById('inputMeeting').value = meeting;
            document.getElementById('inputName').focus();
        }
        else {
            document.getElementById('inputMeeting').focus();
        }
        this.defaultBrowserBehaviour = new index_1.DefaultBrowserBehavior();
    };
    DemoMeetingApp.prototype.initEventListeners = function () {
        var _this = this;
        window.addEventListener('resize', function () {
            _this.layoutVideoTiles();
        });
        document.getElementById('form-authenticate').addEventListener('submit', function (e) {
            e.preventDefault();
            _this.meeting = document.getElementById('inputMeeting').value;
            _this.name = document.getElementById('inputName').value;
            _this.region = document.getElementById('inputRegion').value;
            new index_1.AsyncScheduler().start(function () { return __awaiter(_this, void 0, void 0, function () {
                var chimeMeetingId, error_1, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            chimeMeetingId = '';
                            this.showProgress('progress-authenticate');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.authenticate()];
                        case 2:
                            chimeMeetingId = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            document.getElementById('failed-meeting').innerText = "Meeting ID: " + this.meeting;
                            document.getElementById('failed-meeting-error').innerText =
                                error_1.message;
                            this.switchToFlow('flow-failed-meeting');
                            return [2 /*return*/];
                        case 4:
                            document.getElementById('meeting-id').innerText = this.meeting + " (" + this.region + ")";
                            document.getElementById('chime-meeting-id').innerText = "Meeting ID: " + chimeMeetingId;
                            document.getElementById('mobile-chime-meeting-id').innerText = "Meeting ID: " + chimeMeetingId;
                            document.getElementById('mobile-attendee-id').innerText = "Attendee ID: " + this.meetingSession.configuration.credentials.attendeeId;
                            document.getElementById('desktop-attendee-id').innerText = "Attendee ID: " + this.meetingSession.configuration.credentials.attendeeId;
                            document.getElementById('info-meeting').innerText = this.meeting;
                            document.getElementById('info-name').innerText = this.name;
                            this.switchToFlow('flow-devices');
                            return [4 /*yield*/, this.openAudioInputFromSelection()];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, this.openVideoInputFromSelection(document.getElementById('video-input').value, true)];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            err_1 = _a.sent();
                            this.log('no video input device selected');
                            return [3 /*break*/, 9];
                        case 9: return [4 /*yield*/, this.openAudioOutputFromSelection()];
                        case 10:
                            _a.sent();
                            this.hideProgress('progress-authenticate');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        document.getElementById('to-sip-flow').addEventListener('click', function (e) {
            e.preventDefault();
            _this.switchToFlow('flow-sip-authenticate');
        });
        document.getElementById('form-sip-authenticate').addEventListener('submit', function (e) {
            e.preventDefault();
            _this.meeting = document.getElementById('sip-inputMeeting').value;
            _this.voiceConnectorId = document.getElementById('voiceConnectorId').value;
            new index_1.AsyncScheduler().start(function () { return __awaiter(_this, void 0, void 0, function () {
                var region, response, json, joinToken, error_2, sipUriElement;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showProgress('progress-authenticate');
                            region = this.region || 'us-east-1';
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, fetch(DemoMeetingApp.BASE_URL + "join?title=" + encodeURIComponent(this.meeting) + "&name=" + encodeURIComponent(DemoMeetingApp.DID) + "&region=" + encodeURIComponent(region), {
                                    method: 'POST'
                                })];
                        case 2:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 3:
                            json = _a.sent();
                            joinToken = json.JoinInfo.Attendee.Attendee.JoinToken;
                            this.sipURI = "sip:" + DemoMeetingApp.DID + "@" + this.voiceConnectorId + ";transport=tls;X-joinToken=" + joinToken;
                            this.switchToFlow('flow-sip-uri');
                            return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            document.getElementById('failed-meeting').innerText = "Meeting ID: " + this.meeting;
                            document.getElementById('failed-meeting-error').innerText =
                                error_2.message;
                            this.switchToFlow('flow-failed-meeting');
                            return [2 /*return*/];
                        case 5:
                            sipUriElement = document.getElementById('sip-uri');
                            sipUriElement.value = this.sipURI;
                            this.hideProgress('progress-authenticate');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        document.getElementById('copy-sip-uri').addEventListener('click', function () {
            var sipUriElement = document.getElementById('sip-uri');
            sipUriElement.select();
            document.execCommand('copy');
        });
        var audioInput = document.getElementById('audio-input');
        audioInput.addEventListener('change', function (_ev) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log('audio input device is changed');
                        return [4 /*yield*/, this.openAudioInputFromSelection()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        var videoInput = document.getElementById('video-input');
        videoInput.addEventListener('change', function (_ev) { return __awaiter(_this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log('video input device is changed');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.openVideoInputFromSelection(videoInput.value, true)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        this.log('no video input device selected');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        var optionalFeatures = document.getElementById('optional-features');
        optionalFeatures.addEventListener('change', function (_ev) { return __awaiter(_this, void 0, void 0, function () {
            var collections, i;
            return __generator(this, function (_a) {
                collections = optionalFeatures.selectedOptions;
                this.enableSimulcast = false;
                this.enableWebAudio = false;
                this.enableUnifiedPlanForChromiumBasedBrowsers = true;
                this.log("Feature lists:");
                for (i = 0; i < collections.length; i++) {
                    // hard code magic
                    if (collections[i].value === 'simulcast') {
                        this.enableSimulcast = true;
                        this.log('attempt to enable simulcast');
                    }
                    if (collections[i].value === 'webaudio') {
                        this.enableWebAudio = true;
                        this.log('attempt to enable webaudio');
                    }
                }
                return [2 /*return*/];
            });
        }); });
        var videoInputQuality = document.getElementById('video-input-quality');
        videoInputQuality.addEventListener('change', function (_ev) { return __awaiter(_this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log('Video input quality is changed');
                        switch (videoInputQuality.value) {
                            case '360p':
                                this.audioVideo.chooseVideoInputQuality(640, 360, 15, 600);
                                break;
                            case '540p':
                                this.audioVideo.chooseVideoInputQuality(960, 540, 15, 1400);
                                break;
                            case '720p':
                                this.audioVideo.chooseVideoInputQuality(1280, 720, 15, 1400);
                                break;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.openVideoInputFromSelection(videoInput.value, true)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        this.log('no video input device selected');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        var audioOutput = document.getElementById('audio-output');
        audioOutput.addEventListener('change', function (_ev) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log('audio output device is changed');
                        return [4 /*yield*/, this.openAudioOutputFromSelection()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        document.getElementById('button-test-sound').addEventListener('click', function (e) {
            e.preventDefault();
            var audioOutput = document.getElementById('audio-output');
            new TestSound(audioOutput.value);
        });
        document.getElementById('form-devices').addEventListener('submit', function (e) {
            e.preventDefault();
            new index_1.AsyncScheduler().start(function () { return __awaiter(_this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this.showProgress('progress-join');
                            return [4 /*yield*/, this.join()];
                        case 1:
                            _a.sent();
                            this.audioVideo.stopVideoPreviewForVideoInput(document.getElementById('video-preview'));
                            this.audioVideo.chooseVideoInputDevice(null);
                            this.hideProgress('progress-join');
                            this.displayButtonStates();
                            this.switchToFlow('flow-meeting');
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            document.getElementById('failed-join').innerText = "Meeting ID: " + this.meeting;
                            document.getElementById('failed-join-error').innerText = "Error: " + error_3.message;
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        });
        var buttonMute = document.getElementById('button-microphone');
        buttonMute.addEventListener('mousedown', function (_e) {
            if (_this.toggleButton('button-microphone')) {
                _this.audioVideo.realtimeUnmuteLocalAudio();
            }
            else {
                _this.audioVideo.realtimeMuteLocalAudio();
            }
        });
        var buttonVideo = document.getElementById('button-camera');
        buttonVideo.addEventListener('click', function (_e) {
            new index_1.AsyncScheduler().start(function () { return __awaiter(_this, void 0, void 0, function () {
                var camera, err_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.toggleButton('button-camera') && this.canStartLocalVideo)) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            camera = videoInput.value;
                            if (videoInput.value === 'None') {
                                camera = this.cameraDeviceIds.length ? this.cameraDeviceIds[0] : 'None';
                            }
                            return [4 /*yield*/, this.openVideoInputFromSelection(camera, false)];
                        case 2:
                            _a.sent();
                            this.audioVideo.startLocalVideoTile();
                            return [3 /*break*/, 4];
                        case 3:
                            err_4 = _a.sent();
                            this.log('no video input device selected');
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            this.audioVideo.stopLocalVideoTile();
                            this.hideTile(DemoTileOrganizer.LOCAL_VIDEO_INDEX);
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
        });
        var buttonPauseContentShare = document.getElementById('button-pause-content-share');
        buttonPauseContentShare.addEventListener('click', function (_e) {
            if (!_this.isButtonOn('button-content-share')) {
                return;
            }
            new index_1.AsyncScheduler().start(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.toggleButton('button-pause-content-share')) {
                        this.audioVideo.pauseContentShare();
                    }
                    else {
                        this.audioVideo.unpauseContentShare();
                    }
                    return [2 /*return*/];
                });
            }); });
        });
        var buttonContentShare = document.getElementById('button-content-share');
        buttonContentShare.addEventListener('click', function (_e) {
            new index_1.AsyncScheduler().start(function () {
                if (!_this.isButtonOn('button-content-share')) {
                    _this.contentShareStart();
                }
                else {
                    _this.contentShareStop();
                }
            });
        });
        var buttonSpeaker = document.getElementById('button-speaker');
        buttonSpeaker.addEventListener('click', function (_e) {
            new index_1.AsyncScheduler().start(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.toggleButton('button-speaker')) {
                        this.audioVideo.bindAudioElement(document.getElementById('meeting-audio'));
                    }
                    else {
                        this.audioVideo.unbindAudioElement();
                    }
                    return [2 /*return*/];
                });
            }); });
        });
        var sendMessage = function () {
            new index_1.AsyncScheduler().start(function () {
                var textArea = document.getElementById('send-message');
                var textToSend = textArea.value.trim();
                if (!textToSend) {
                    return;
                }
                textArea.value = '';
                _this.audioVideo.realtimeSendDataMessage(DemoMeetingApp.DATA_MESSAGE_TOPIC, textToSend, DemoMeetingApp.DATA_MESSAGE_LIFETIME_MS);
                // echo the message to the handler
                _this.dataMessageHandler(new index_1.DataMessage(Date.now(), DemoMeetingApp.DATA_MESSAGE_TOPIC, new TextEncoder().encode(textToSend), _this.meetingSession.configuration.credentials.attendeeId, _this.meetingSession.configuration.credentials.externalUserId));
            });
        };
        var textAreaSendMessage = document.getElementById('send-message');
        textAreaSendMessage.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                if (e.shiftKey) {
                    textAreaSendMessage.rows++;
                }
                else {
                    e.preventDefault();
                    sendMessage();
                    textAreaSendMessage.rows = 1;
                }
            }
        });
        var buttonMeetingEnd = document.getElementById('button-meeting-end');
        buttonMeetingEnd.addEventListener('click', function (_e) {
            var confirmEnd = (new URL(window.location.href).searchParams.get('confirm-end')) === 'true';
            var prompt = 'Are you sure you want to end the meeting for everyone? The meeting cannot be used after ending it.';
            if (confirmEnd && !window.confirm(prompt)) {
                return;
            }
            new index_1.AsyncScheduler().start(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            buttonMeetingEnd.disabled = true;
                            return [4 /*yield*/, this.endMeeting()];
                        case 1:
                            _a.sent();
                            this.leave();
                            buttonMeetingEnd.disabled = false;
                            // @ts-ignore
                            window.location = window.location.pathname;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        var buttonMeetingLeave = document.getElementById('button-meeting-leave');
        buttonMeetingLeave.addEventListener('click', function (_e) {
            new index_1.AsyncScheduler().start(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    buttonMeetingLeave.disabled = true;
                    this.leave();
                    buttonMeetingLeave.disabled = false;
                    // @ts-ignore
                    window.location = window.location.pathname;
                    return [2 /*return*/];
                });
            }); });
        });
    };
    DemoMeetingApp.prototype.getSupportedMediaRegions = function () {
        var supportedMediaRegions = [];
        var mediaRegion = (document.getElementById("inputRegion"));
        for (var i = 0; i < mediaRegion.length; i++) {
            supportedMediaRegions.push(mediaRegion.value);
        }
        return supportedMediaRegions;
    };
    DemoMeetingApp.prototype.getNearestMediaRegion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nearestMediaRegionResponse, nearestMediaRegionJSON, nearestMediaRegion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://nearest-media-region.l.chime.aws", {
                            method: 'GET'
                        })];
                    case 1:
                        nearestMediaRegionResponse = _a.sent();
                        return [4 /*yield*/, nearestMediaRegionResponse.json()];
                    case 2:
                        nearestMediaRegionJSON = _a.sent();
                        nearestMediaRegion = nearestMediaRegionJSON.region;
                        return [2 /*return*/, nearestMediaRegion];
                }
            });
        });
    };
    DemoMeetingApp.prototype.setMediaRegion = function () {
        var _this = this;
        new index_1.AsyncScheduler().start(function () { return __awaiter(_this, void 0, void 0, function () {
            var nearestMediaRegion, supportedMediaRegions, mediaRegionElement, newMediaRegionOption, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getNearestMediaRegion()];
                    case 1:
                        nearestMediaRegion = _a.sent();
                        if (nearestMediaRegion === '' || nearestMediaRegion === null) {
                            throw new Error('Nearest Media Region cannot be null or empty');
                        }
                        supportedMediaRegions = this.getSupportedMediaRegions();
                        if (supportedMediaRegions.indexOf(nearestMediaRegion) === -1) {
                            supportedMediaRegions.push(nearestMediaRegion);
                            mediaRegionElement = (document.getElementById("inputRegion"));
                            newMediaRegionOption = document.createElement("option");
                            newMediaRegionOption.value = nearestMediaRegion;
                            newMediaRegionOption.text = nearestMediaRegion + " (" + nearestMediaRegion + ")";
                            mediaRegionElement.add(newMediaRegionOption, null);
                        }
                        document.getElementById('inputRegion').value = nearestMediaRegion;
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        this.log('Default media region selected: ' + error_4.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    DemoMeetingApp.prototype.toggleButton = function (button, state) {
        if (state === 'on') {
            this.buttonStates[button] = true;
        }
        else if (state === 'off') {
            this.buttonStates[button] = false;
        }
        else {
            this.buttonStates[button] = !this.buttonStates[button];
        }
        this.displayButtonStates();
        return this.buttonStates[button];
    };
    DemoMeetingApp.prototype.isButtonOn = function (button) {
        return this.buttonStates[button];
    };
    DemoMeetingApp.prototype.displayButtonStates = function () {
        for (var button in this.buttonStates) {
            var element = document.getElementById(button);
            var drop = document.getElementById(button + "-drop");
            var on = this.buttonStates[button];
            element.classList.add(on ? 'btn-success' : 'btn-outline-secondary');
            element.classList.remove(on ? 'btn-outline-secondary' : 'btn-success');
            element.firstElementChild.classList.add(on ? 'svg-active' : 'svg-inactive');
            element.firstElementChild.classList.remove(on ? 'svg-inactive' : 'svg-active');
            if (drop) {
                drop.classList.add(on ? 'btn-success' : 'btn-outline-secondary');
                drop.classList.remove(on ? 'btn-outline-secondary' : 'btn-success');
            }
        }
    };
    DemoMeetingApp.prototype.showProgress = function (id) {
        document.getElementById(id).style.visibility = 'visible';
    };
    DemoMeetingApp.prototype.hideProgress = function (id) {
        document.getElementById(id).style.visibility = 'hidden';
    };
    DemoMeetingApp.prototype.hideElement = function (id) {
        document.getElementById(id).style.visibility = 'hidden';
    };
    DemoMeetingApp.prototype.noneElement = function (id) {
        document.getElementById(id).style.display = 'none';
    };
    DemoMeetingApp.prototype.switchToFlow = function (flow) {
        this.analyserNodeCallback = function () { };
        Array.from(document.getElementsByClassName('flow')).map(function (e) { return (e.style.display = 'none'); });
        document.getElementById(flow).style.display = 'block';
        if (flow === 'flow-devices') {
            this.startAudioPreview();
        }
    };
    DemoMeetingApp.prototype.audioInputsChanged = function (_freshAudioInputDeviceList) {
        this.populateAudioInputList();
    };
    DemoMeetingApp.prototype.videoInputsChanged = function (_freshVideoInputDeviceList) {
        this.populateVideoInputList();
    };
    DemoMeetingApp.prototype.audioOutputsChanged = function (_freshAudioOutputDeviceList) {
        this.populateAudioOutputList();
    };
    DemoMeetingApp.prototype.audioInputStreamEnded = function (deviceId) {
        this.log("Current audio input stream from device id " + deviceId + " ended.");
    };
    DemoMeetingApp.prototype.videoInputStreamEnded = function (deviceId) {
        this.log("Current video input stream from device id " + deviceId + " ended.");
    };
    DemoMeetingApp.prototype.estimatedDownlinkBandwidthLessThanRequired = function (estimatedDownlinkBandwidthKbps, requiredVideoDownlinkBandwidthKbps) {
        this.log("Estimated downlink bandwidth is " + estimatedDownlinkBandwidthKbps + " is less than required bandwidth for video " + requiredVideoDownlinkBandwidthKbps);
    };
    DemoMeetingApp.prototype.videoNotReceivingEnoughData = function (videoReceivingReports) {
        this.log("One or more video streams are not receiving expected amounts of data " + JSON.stringify(videoReceivingReports));
    };
    DemoMeetingApp.prototype.metricsDidReceive = function (clientMetricReport) {
        var metricReport = clientMetricReport.getObservableMetrics();
        if (typeof metricReport.availableSendBandwidth === 'number' && !isNaN(metricReport.availableSendBandwidth)) {
            document.getElementById('video-uplink-bandwidth').innerText =
                'Available Uplink Bandwidth: ' + String(metricReport.availableSendBandwidth / 1000) + ' Kbps';
        }
        else if (typeof metricReport.availableOutgoingBitrate === 'number' && !isNaN(metricReport.availableOutgoingBitrate)) {
            document.getElementById('video-uplink-bandwidth').innerText =
                'Available Uplink Bandwidth: ' + String(metricReport.availableOutgoingBitrate / 1000) + ' Kbps';
        }
        else {
            document.getElementById('video-uplink-bandwidth').innerText =
                'Available Uplink Bandwidth: Unknown';
        }
        if (typeof metricReport.availableReceiveBandwidth === 'number' && !isNaN(metricReport.availableReceiveBandwidth)) {
            document.getElementById('video-downlink-bandwidth').innerText =
                'Available Downlink Bandwidth: ' + String(metricReport.availableReceiveBandwidth / 1000) + ' Kbps';
        }
        else if (typeof metricReport.availableIncomingBitrate === 'number' && !isNaN(metricReport.availableIncomingBitrate)) {
            document.getElementById('video-downlink-bandwidth').innerText =
                'Available Downlink Bandwidth: ' + String(metricReport.availableIncomingBitrate / 1000) + ' Kbps';
        }
        else {
            document.getElementById('video-downlink-bandwidth').innerText =
                'Available Downlink Bandwidth: Unknown';
        }
    };
    DemoMeetingApp.prototype.initializeMeetingSession = function (configuration) {
        return __awaiter(this, void 0, void 0, function () {
            var logger, logLevel, consoleLogger, deviceController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logLevel = index_1.LogLevel.INFO;
                        consoleLogger = logger = new index_1.ConsoleLogger('SDK', logLevel);
                        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
                            logger = consoleLogger;
                        }
                        else {
                            logger = new index_1.MultiLogger(consoleLogger, new index_1.MeetingSessionPOSTLogger('SDK', configuration, DemoMeetingApp.LOGGER_BATCH_SIZE, DemoMeetingApp.LOGGER_INTERVAL_MS, DemoMeetingApp.BASE_URL + "logs", logLevel));
                        }
                        deviceController = new index_1.DefaultDeviceController(logger);
                        configuration.enableWebAudio = this.enableWebAudio;
                        configuration.enableUnifiedPlanForChromiumBasedBrowsers = this.enableUnifiedPlanForChromiumBasedBrowsers;
                        configuration.attendeePresenceTimeoutMs = 5000;
                        configuration.enableSimulcastForUnifiedPlanChromiumBasedBrowsers = this.enableSimulcast;
                        this.meetingSession = new index_1.DefaultMeetingSession(configuration, logger, deviceController);
                        this.audioVideo = this.meetingSession.audioVideo;
                        this.audioVideo.addDeviceChangeObserver(this);
                        this.setupDeviceLabelTrigger();
                        return [4 /*yield*/, this.populateAllDeviceLists()];
                    case 1:
                        _a.sent();
                        this.setupMuteHandler();
                        this.setupCanUnmuteHandler();
                        this.setupSubscribeToAttendeeIdPresenceHandler();
                        this.setupDataMessage();
                        this.audioVideo.addObserver(this);
                        this.audioVideo.addContentShareObserver(this);
                        this.initContentShareDropDownItems();
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.setClickHandler = function (elementId, f) {
        document.getElementById(elementId).addEventListener('click', function () {
            f();
        });
    };
    DemoMeetingApp.prototype.join = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        window.addEventListener('unhandledrejection', function (event) {
                            _this.log(event.reason);
                        });
                        return [4 /*yield*/, this.openAudioInputFromSelection()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.openAudioOutputFromSelection()];
                    case 2:
                        _a.sent();
                        this.audioVideo.start();
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.leave = function () {
        this.audioVideo.stop();
        this.roster = {};
    };
    DemoMeetingApp.prototype.setupMuteHandler = function () {
        var _this = this;
        var handler = function (isMuted) {
            _this.log("muted = " + isMuted);
        };
        this.audioVideo.realtimeSubscribeToMuteAndUnmuteLocalAudio(handler);
        var isMuted = this.audioVideo.realtimeIsLocalAudioMuted();
        handler(isMuted);
    };
    DemoMeetingApp.prototype.setupCanUnmuteHandler = function () {
        var _this = this;
        var handler = function (canUnmute) {
            _this.log("canUnmute = " + canUnmute);
        };
        this.audioVideo.realtimeSubscribeToSetCanUnmuteLocalAudio(handler);
        handler(this.audioVideo.realtimeCanUnmuteLocalAudio());
    };
    DemoMeetingApp.prototype.updateRoster = function () {
        var roster = document.getElementById('roster');
        var newRosterCount = Object.keys(this.roster).length;
        while (roster.getElementsByTagName('li').length < newRosterCount) {
            var li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.appendChild(document.createElement('span'));
            li.appendChild(document.createElement('span'));
            roster.appendChild(li);
        }
        while (roster.getElementsByTagName('li').length > newRosterCount) {
            roster.removeChild(roster.getElementsByTagName('li')[0]);
        }
        var entries = roster.getElementsByTagName('li');
        var i = 0;
        for (var attendeeId in this.roster) {
            var spanName = entries[i].getElementsByTagName('span')[0];
            var spanStatus = entries[i].getElementsByTagName('span')[1];
            var statusClass = 'badge badge-pill ';
            var statusText = '\xa0'; // &nbsp
            if (this.roster[attendeeId].signalStrength < 1) {
                statusClass += 'badge-warning';
            }
            else if (this.roster[attendeeId].signalStrength === 0) {
                statusClass += 'badge-danger';
            }
            else if (this.roster[attendeeId].muted) {
                statusText = 'MUTED';
                statusClass += 'badge-secondary';
            }
            else if (this.roster[attendeeId].active) {
                statusText = 'SPEAKING';
                statusClass += 'badge-success';
            }
            else if (this.roster[attendeeId].volume > 0) {
                statusClass += 'badge-success';
            }
            this.updateProperty(spanName, 'innerText', this.roster[attendeeId].name);
            this.updateProperty(spanStatus, 'innerText', statusText);
            this.updateProperty(spanStatus, 'className', statusClass);
            i++;
        }
    };
    DemoMeetingApp.prototype.updateProperty = function (obj, key, value) {
        if (value !== undefined && obj[key] !== value) {
            obj[key] = value;
        }
    };
    DemoMeetingApp.prototype.setupSubscribeToAttendeeIdPresenceHandler = function () {
        var _this = this;
        var handler = function (attendeeId, present, externalUserId, dropped) {
            _this.log(attendeeId + " present = " + present + " (" + externalUserId + ")");
            var isContentAttendee = new index_1.DefaultModality(attendeeId).hasModality(index_1.DefaultModality.MODALITY_CONTENT);
            var isSelfAttendee = new index_1.DefaultModality(attendeeId).base() === _this.meetingSession.configuration.credentials.attendeeId;
            if (!present) {
                delete _this.roster[attendeeId];
                _this.updateRoster();
                _this.log(attendeeId + " dropped = " + dropped + " (" + externalUserId + ")");
                return;
            }
            //If someone else share content, stop the current content share
            if (!_this.allowMaxContentShare() && !isSelfAttendee && isContentAttendee && _this.isButtonOn('button-content-share')) {
                _this.contentShareStop();
            }
            if (!_this.roster[attendeeId]) {
                _this.roster[attendeeId] = {
                    name: (externalUserId.split('#').slice(-1)[0]) + (isContentAttendee ? ' «Content»' : '')
                };
            }
            _this.audioVideo.realtimeSubscribeToVolumeIndicator(attendeeId, function (attendeeId, volume, muted, signalStrength) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.roster[attendeeId]) {
                        return [2 /*return*/];
                    }
                    if (volume !== null) {
                        this.roster[attendeeId].volume = Math.round(volume * 100);
                    }
                    if (muted !== null) {
                        this.roster[attendeeId].muted = muted;
                    }
                    if (signalStrength !== null) {
                        this.roster[attendeeId].signalStrength = Math.round(signalStrength * 100);
                    }
                    this.updateRoster();
                    return [2 /*return*/];
                });
            }); });
        };
        this.audioVideo.realtimeSubscribeToAttendeeIdPresence(handler);
        var activeSpeakerHandler = function (attendeeIds) {
            for (var attendeeId in _this.roster) {
                _this.roster[attendeeId].active = false;
            }
            for (var _i = 0, attendeeIds_1 = attendeeIds; _i < attendeeIds_1.length; _i++) {
                var attendeeId = attendeeIds_1[_i];
                if (_this.roster[attendeeId]) {
                    _this.roster[attendeeId].active = true;
                    break; // only show the most active speaker
                }
            }
            _this.layoutVideoTiles();
        };
        this.audioVideo.subscribeToActiveSpeakerDetector(new index_1.DefaultActiveSpeakerPolicy(), activeSpeakerHandler, function (scores) {
            for (var attendeeId in scores) {
                if (_this.roster[attendeeId]) {
                    _this.roster[attendeeId].score = scores[attendeeId];
                }
            }
            _this.updateRoster();
        }, this.showActiveSpeakerScores ? 100 : 0);
    };
    DemoMeetingApp.prototype.getStatsForOutbound = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var videoElement, stream, track, basicReports, reports, duration;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        videoElement = document.getElementById(id);
                        stream = videoElement.srcObject;
                        track = stream.getVideoTracks()[0];
                        basicReports = {};
                        return [4 /*yield*/, this.audioVideo.getRTCPeerConnectionStats(track)];
                    case 1:
                        reports = _a.sent();
                        reports.forEach(function (report) {
                            if (report.type === 'outbound-rtp') {
                                // remained to be calculated
                                _this.log(id + " is bound to ssrc " + report.ssrc);
                                basicReports['bitrate'] = report.bytesSent;
                                basicReports['width'] = report.frameWidth;
                                basicReports['height'] = report.frameHeight;
                                basicReports['fps'] = report.framesEncoded;
                                duration = report.timestamp;
                            }
                        });
                        return [4 /*yield*/, new index_1.TimeoutScheduler(1000).start(function () {
                                _this.audioVideo.getRTCPeerConnectionStats(track).then(function (reports) {
                                    reports.forEach(function (report) {
                                        if (report.type === 'outbound-rtp') {
                                            duration = report.timestamp - duration;
                                            duration = duration / 1000;
                                            // remained to be calculated
                                            basicReports['bitrate'] = Math.trunc((report.bytesSent - basicReports['bitrate']) * 8 / duration);
                                            basicReports['width'] = report.frameWidth;
                                            basicReports['height'] = report.frameHeight;
                                            basicReports['fps'] = Math.trunc((report.framesEncoded - basicReports['fps']) / duration);
                                            _this.log(JSON.stringify(basicReports));
                                        }
                                    });
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.dataMessageHandler = function (dataMessage) {
        if (!dataMessage.throttled) {
            var isSelf = dataMessage.senderAttendeeId === this.meetingSession.configuration.credentials.attendeeId;
            if (dataMessage.timestampMs <= this.lastReceivedMessageTimestamp) {
                return;
            }
            this.lastReceivedMessageTimestamp = dataMessage.timestampMs;
            var messageDiv = document.getElementById('receive-message');
            var messageNameSpan = document.createElement('div');
            messageNameSpan.classList.add('message-bubble-sender');
            messageNameSpan.innerText = (dataMessage.senderExternalUserId.split('#').slice(-1)[0]);
            var messageTextSpan = document.createElement('div');
            messageTextSpan.classList.add(isSelf ? 'message-bubble-self' : 'message-bubble-other');
            messageTextSpan.innerHTML = this.markdown.render(dataMessage.text()).replace(/[<]a /g, '<a target="_blank" ');
            var appendClass_1 = function (element, className) {
                for (var i = 0; i < element.children.length; i++) {
                    var child = element.children[i];
                    child.classList.add(className);
                    appendClass_1(child, className);
                }
            };
            appendClass_1(messageTextSpan, 'markdown');
            if (this.lastMessageSender !== dataMessage.senderAttendeeId) {
                messageDiv.appendChild(messageNameSpan);
            }
            this.lastMessageSender = dataMessage.senderAttendeeId;
            messageDiv.appendChild(messageTextSpan);
            messageDiv.scrollTop = messageDiv.scrollHeight;
        }
        else {
            this.log('Message is throttled. Please resend');
        }
    };
    DemoMeetingApp.prototype.setupDataMessage = function () {
        var _this = this;
        this.audioVideo.realtimeSubscribeToReceiveDataMessage(DemoMeetingApp.DATA_MESSAGE_TOPIC, function (dataMessage) {
            _this.dataMessageHandler(dataMessage);
        });
    };
    // eslint-disable-next-line
    DemoMeetingApp.prototype.joinMeeting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(DemoMeetingApp.BASE_URL + "join?title=" + encodeURIComponent(this.meeting) + "&name=" + encodeURIComponent(this.name) + "&region=" + encodeURIComponent(this.region), {
                            method: 'POST'
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        if (json.error) {
                            throw new Error("Server error: " + json.error);
                        }
                        return [2 /*return*/, json];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DemoMeetingApp.prototype.endMeeting = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(DemoMeetingApp.BASE_URL + "end?title=" + encodeURIComponent(this.meeting), {
                            method: 'POST'
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DemoMeetingApp.prototype.getAttendee = function (attendeeId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(DemoMeetingApp.BASE_URL + "attendee?title=" + encodeURIComponent(this.meeting) + "&attendee=" + encodeURIComponent(attendeeId))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        if (json.error) {
                            throw new Error("Server error: " + json.error);
                        }
                        return [2 /*return*/, json];
                }
            });
        });
    };
    DemoMeetingApp.prototype.setupDeviceLabelTrigger = function () {
        var _this = this;
        // Note that device labels are privileged since they add to the
        // fingerprinting surface area of the browser session. In Chrome private
        // tabs and in all Firefox tabs, the labels can only be read once a
        // MediaStream is active. How to deal with this restriction depends on the
        // desired UX. The device controller includes an injectable device label
        // trigger which allows you to perform custom behavior in case there are no
        // labels, such as creating a temporary audio/video stream to unlock the
        // device names, which is the default behavior. Here we override the
        // trigger to also show an alert to let the user know that we are asking for
        // mic/camera permission.
        //
        // Also note that Firefox has its own device picker, which may be useful
        // for the first device selection. Subsequent device selections could use
        // a custom UX with a specific device id.
        this.audioVideo.setDeviceLabelTrigger(function () { return __awaiter(_this, void 0, void 0, function () {
            var stream;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isRecorder() || this.isBroadcaster()) {
                            throw new Error('Recorder or Broadcaster does not need device labels');
                        }
                        this.switchToFlow('flow-need-permission');
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ audio: true, video: true })];
                    case 1:
                        stream = _a.sent();
                        this.switchToFlow('flow-devices');
                        return [2 /*return*/, stream];
                }
            });
        }); });
    };
    DemoMeetingApp.prototype.populateDeviceList = function (elementId, genericName, devices, additionalOptions) {
        var list = document.getElementById(elementId);
        while (list.firstElementChild) {
            list.removeChild(list.firstElementChild);
        }
        for (var i = 0; i < devices.length; i++) {
            var option = document.createElement('option');
            list.appendChild(option);
            option.text = devices[i].label || genericName + " " + (i + 1);
            option.value = devices[i].deviceId;
        }
        if (additionalOptions.length > 0) {
            var separator = document.createElement('option');
            separator.disabled = true;
            separator.text = '──────────';
            list.appendChild(separator);
            for (var _i = 0, additionalOptions_1 = additionalOptions; _i < additionalOptions_1.length; _i++) {
                var additionalOption = additionalOptions_1[_i];
                var option = document.createElement('option');
                list.appendChild(option);
                option.text = additionalOption;
                option.value = additionalOption;
            }
        }
        if (!list.firstElementChild) {
            var option = document.createElement('option');
            option.text = 'Device selection unavailable';
            list.appendChild(option);
        }
    };
    DemoMeetingApp.prototype.populateInMeetingDeviceList = function (elementId, genericName, devices, additionalOptions, callback) {
        var menu = document.getElementById(elementId);
        while (menu.firstElementChild) {
            menu.removeChild(menu.firstElementChild);
        }
        var _loop_1 = function (i) {
            this_1.createDropdownMenuItem(menu, devices[i].label || genericName + " " + (i + 1), function () {
                callback(devices[i].deviceId);
            });
        };
        var this_1 = this;
        for (var i = 0; i < devices.length; i++) {
            _loop_1(i);
        }
        if (additionalOptions.length > 0) {
            this.createDropdownMenuItem(menu, '──────────', function () { }).classList.add('text-center');
            var _loop_2 = function (additionalOption) {
                this_2.createDropdownMenuItem(menu, additionalOption, function () {
                    callback(additionalOption);
                }, elementId + "-" + additionalOption.replace(/\s/g, '-'));
            };
            var this_2 = this;
            for (var _i = 0, additionalOptions_2 = additionalOptions; _i < additionalOptions_2.length; _i++) {
                var additionalOption = additionalOptions_2[_i];
                _loop_2(additionalOption);
            }
        }
        if (!menu.firstElementChild) {
            this.createDropdownMenuItem(menu, 'Device selection unavailable', function () { });
        }
    };
    DemoMeetingApp.prototype.createDropdownMenuItem = function (menu, title, clickHandler, id) {
        var button = document.createElement('button');
        menu.appendChild(button);
        button.innerText = title;
        button.classList.add('dropdown-item');
        this.updateProperty(button, 'id', id);
        button.addEventListener('click', function () {
            clickHandler();
        });
        return button;
    };
    DemoMeetingApp.prototype.populateAllDeviceLists = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.populateAudioInputList()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.populateVideoInputList()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.populateAudioOutputList()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.populateAudioInputList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var genericName, additionalDevices, _a, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        genericName = 'Microphone';
                        additionalDevices = ['None', '440 Hz'];
                        _a = this.populateDeviceList;
                        _b = ['audio-input',
                            genericName];
                        return [4 /*yield*/, this.audioVideo.listAudioInputDevices()];
                    case 1:
                        _a.apply(this, _b.concat([_f.sent(), additionalDevices]));
                        _c = this.populateInMeetingDeviceList;
                        _d = ['dropdown-menu-microphone',
                            genericName];
                        return [4 /*yield*/, this.audioVideo.listAudioInputDevices()];
                    case 2:
                        _c.apply(this, _d.concat([_f.sent(), additionalDevices, function (name) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.audioVideo.chooseAudioInputDevice(this.audioInputSelectionToDevice(name))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }]));
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.populateVideoInputList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var genericName, additionalDevices, _a, _b, _c, _d, cameras;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        genericName = 'Camera';
                        additionalDevices = ['None', 'Blue', 'SMPTE Color Bars'];
                        _a = this.populateDeviceList;
                        _b = ['video-input',
                            genericName];
                        return [4 /*yield*/, this.audioVideo.listVideoInputDevices()];
                    case 1:
                        _a.apply(this, _b.concat([_f.sent(), additionalDevices]));
                        _c = this.populateInMeetingDeviceList;
                        _d = ['dropdown-menu-camera',
                            genericName];
                        return [4 /*yield*/, this.audioVideo.listVideoInputDevices()];
                    case 2:
                        _c.apply(this, _d.concat([_f.sent(), additionalDevices, function (name) { return __awaiter(_this, void 0, void 0, function () {
                                var err_5;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, this.openVideoInputFromSelection(name, false)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            err_5 = _a.sent();
                                            this.log('no video input device selected');
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }]));
                        return [4 /*yield*/, this.audioVideo.listVideoInputDevices()];
                    case 3:
                        cameras = _f.sent();
                        this.cameraDeviceIds = cameras.map(function (deviceInfo) {
                            return deviceInfo.deviceId;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.populateAudioOutputList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var genericName, additionalDevices, _a, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        genericName = 'Speaker';
                        additionalDevices = [];
                        _a = this.populateDeviceList;
                        _b = ['audio-output',
                            genericName];
                        return [4 /*yield*/, this.audioVideo.listAudioOutputDevices()];
                    case 1:
                        _a.apply(this, _b.concat([_f.sent(), additionalDevices]));
                        _c = this.populateInMeetingDeviceList;
                        _d = ['dropdown-menu-speaker',
                            genericName];
                        return [4 /*yield*/, this.audioVideo.listAudioOutputDevices()];
                    case 2:
                        _c.apply(this, _d.concat([_f.sent(), additionalDevices, function (name) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.audioVideo.chooseAudioOutputDevice(name)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }]));
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.openAudioInputFromSelection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var audioInput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        audioInput = document.getElementById('audio-input');
                        return [4 /*yield*/, this.audioVideo.chooseAudioInputDevice(this.audioInputSelectionToDevice(audioInput.value))];
                    case 1:
                        _a.sent();
                        this.startAudioPreview();
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.setAudioPreviewPercent = function (percent) {
        var audioPreview = document.getElementById('audio-preview');
        this.updateProperty(audioPreview.style, 'transitionDuration', '33ms');
        this.updateProperty(audioPreview.style, 'width', percent + "%");
        if (audioPreview.getAttribute('aria-valuenow') !== "" + percent) {
            audioPreview.setAttribute('aria-valuenow', "" + percent);
        }
    };
    DemoMeetingApp.prototype.startAudioPreview = function () {
        var _this = this;
        this.setAudioPreviewPercent(0);
        var analyserNode = this.audioVideo.createAnalyserNodeForAudioInput();
        if (!analyserNode) {
            return;
        }
        if (!analyserNode.getByteTimeDomainData) {
            document.getElementById('audio-preview').parentElement.style.visibility = 'hidden';
            return;
        }
        var data = new Uint8Array(analyserNode.fftSize);
        var frameIndex = 0;
        this.analyserNodeCallback = function () {
            if (frameIndex === 0) {
                analyserNode.getByteTimeDomainData(data);
                var lowest = 0.01;
                var max = lowest;
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var f = data_1[_i];
                    max = Math.max(max, (f - 128) / 128);
                }
                var normalized = (Math.log(lowest) - Math.log(max)) / Math.log(lowest);
                var percent = Math.min(Math.max(normalized * 100, 0), 100);
                _this.setAudioPreviewPercent(percent);
            }
            frameIndex = (frameIndex + 1) % 2;
            requestAnimationFrame(_this.analyserNodeCallback);
        };
        requestAnimationFrame(this.analyserNodeCallback);
    };
    DemoMeetingApp.prototype.openAudioOutputFromSelection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var audioOutput, audioMix;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        audioOutput = document.getElementById('audio-output');
                        return [4 /*yield*/, this.audioVideo.chooseAudioOutputDevice(audioOutput.value)];
                    case 1:
                        _a.sent();
                        audioMix = document.getElementById('meeting-audio');
                        return [4 /*yield*/, this.audioVideo.bindAudioElement(audioMix)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.openVideoInputFromSelection = function (selection, showPreview) {
        return __awaiter(this, void 0, void 0, function () {
            var device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (selection) {
                            this.selectedVideoInput = selection;
                        }
                        this.log("Switching to: " + this.selectedVideoInput);
                        device = this.videoInputSelectionToDevice(this.selectedVideoInput);
                        if (!(device === null)) return [3 /*break*/, 2];
                        if (showPreview) {
                            this.audioVideo.stopVideoPreviewForVideoInput(document.getElementById('video-preview'));
                        }
                        this.audioVideo.stopLocalVideoTile();
                        this.toggleButton('button-camera', 'off');
                        // choose video input null is redundant since we expect stopLocalVideoTile to clean up
                        return [4 /*yield*/, this.audioVideo.chooseVideoInputDevice(device)];
                    case 1:
                        // choose video input null is redundant since we expect stopLocalVideoTile to clean up
                        _a.sent();
                        throw new Error('no video device selected');
                    case 2: return [4 /*yield*/, this.audioVideo.chooseVideoInputDevice(device)];
                    case 3:
                        _a.sent();
                        if (showPreview) {
                            this.audioVideo.startVideoPreviewForVideoInput(document.getElementById('video-preview'));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.audioInputSelectionToDevice = function (value) {
        if (this.isRecorder() || this.isBroadcaster()) {
            return null;
        }
        if (value === '440 Hz') {
            return index_1.DefaultDeviceController.synthesizeAudioDevice(440);
        }
        else if (value === 'None') {
            return null;
        }
        return value;
    };
    DemoMeetingApp.prototype.videoInputSelectionToDevice = function (value) {
        if (this.isRecorder() || this.isBroadcaster()) {
            return null;
        }
        if (value === 'Blue') {
            return index_1.DefaultDeviceController.synthesizeVideoDevice('blue');
        }
        else if (value === 'SMPTE Color Bars') {
            return index_1.DefaultDeviceController.synthesizeVideoDevice('smpte');
        }
        else if (value === 'None') {
            return null;
        }
        return value;
    };
    DemoMeetingApp.prototype.initContentShareDropDownItems = function () {
        var _this = this;
        var item = document.getElementById('dropdown-item-content-share-screen-capture');
        item.addEventListener('click', function () {
            _this.contentShareTypeChanged(ContentShareType.ScreenCapture);
        });
        item = document.getElementById('dropdown-item-content-share-screen-test-video');
        item.addEventListener('click', function () {
            _this.contentShareTypeChanged(ContentShareType.VideoFile, DemoMeetingApp.testVideo);
        });
        document.getElementById('content-share-item').addEventListener('change', function () {
            var fileList = document.getElementById('content-share-item');
            var file = fileList.files[0];
            if (!file) {
                _this.log('no content share selected');
                return;
            }
            var url = URL.createObjectURL(file);
            _this.log("content share selected: " + url);
            _this.contentShareTypeChanged(ContentShareType.VideoFile, url);
            fileList.value = '';
        });
    };
    DemoMeetingApp.prototype.contentShareTypeChanged = function (contentShareType, videoUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isButtonOn('button-content-share')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.contentShareStop()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.contentShareType = contentShareType;
                        return [4 /*yield*/, this.contentShareStart(videoUrl)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.contentShareStart = function (videoUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, videoFile, mediaStream;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.toggleButton('button-content-share');
                        _a = this.contentShareType;
                        switch (_a) {
                            case ContentShareType.ScreenCapture: return [3 /*break*/, 1];
                            case ContentShareType.VideoFile: return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        this.audioVideo.startContentShareFromScreenCapture();
                        return [3 /*break*/, 4];
                    case 2:
                        videoFile = document.getElementById('content-share-video');
                        if (videoUrl) {
                            videoFile.src = videoUrl;
                        }
                        return [4 /*yield*/, videoFile.play()];
                    case 3:
                        _b.sent();
                        mediaStream = void 0;
                        if (this.defaultBrowserBehaviour.hasFirefoxWebRTC()) {
                            // @ts-ignore
                            mediaStream = videoFile.mozCaptureStream();
                        }
                        else {
                            // @ts-ignore
                            mediaStream = videoFile.captureStream();
                        }
                        this.audioVideo.startContentShare(mediaStream);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DemoMeetingApp.prototype.contentShareStop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var videoFile;
            return __generator(this, function (_a) {
                if (this.isButtonOn('button-pause-content-share')) {
                    this.toggleButton('button-pause-content-share');
                }
                this.toggleButton('button-content-share');
                this.audioVideo.stopContentShare();
                if (this.contentShareType === ContentShareType.VideoFile) {
                    videoFile = document.getElementById('content-share-video');
                    videoFile.pause();
                    videoFile.style.display = 'none';
                }
                return [2 /*return*/];
            });
        });
    };
    DemoMeetingApp.prototype.isRecorder = function () {
        return (new URL(window.location.href).searchParams.get('record')) === 'true';
    };
    DemoMeetingApp.prototype.isBroadcaster = function () {
        return (new URL(window.location.href).searchParams.get('broadcast')) === 'true';
    };
    DemoMeetingApp.prototype.authenticate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var joinInfo, configuration, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.joinMeeting()];
                    case 1:
                        joinInfo = (_a.sent()).JoinInfo;
                        configuration = new index_1.MeetingSessionConfiguration(joinInfo.Meeting, joinInfo.Attendee);
                        return [4 /*yield*/, this.initializeMeetingSession(configuration)];
                    case 2:
                        _a.sent();
                        url = new URL(window.location.href);
                        url.searchParams.set('m', this.meeting);
                        history.replaceState({}, "" + this.meeting, url.toString());
                        return [2 /*return*/, configuration.meetingId];
                }
            });
        });
    };
    DemoMeetingApp.prototype.log = function (str) {
        console.log("[DEMO] " + str);
    };
    DemoMeetingApp.prototype.audioVideoDidStartConnecting = function (reconnecting) {
        this.log("session connecting. reconnecting: " + reconnecting);
    };
    DemoMeetingApp.prototype.audioVideoDidStart = function () {
        this.log('session started');
    };
    DemoMeetingApp.prototype.audioVideoDidStop = function (sessionStatus) {
        this.log("session stopped from " + JSON.stringify(sessionStatus));
        if (sessionStatus.statusCode() === index_1.MeetingSessionStatusCode.AudioCallEnded) {
            this.log("meeting ended");
            // @ts-ignore
            window.location = window.location.pathname;
        }
    };
    DemoMeetingApp.prototype.videoTileDidUpdate = function (tileState) {
        var _this = this;
        this.log("video tile updated: " + JSON.stringify(tileState, null, '  '));
        if (!tileState.boundAttendeeId) {
            return;
        }
        var tileIndex = this.tileOrganizer.acquireTileIndex(tileState.tileId, tileState.localTile);
        var tileElement = document.getElementById("tile-" + tileIndex);
        var videoElement = document.getElementById("video-" + tileIndex);
        var nameplateElement = document.getElementById("nameplate-" + tileIndex);
        var pauseButtonElement = document.getElementById("video-pause-" + tileIndex);
        pauseButtonElement.addEventListener('click', function () {
            if (!tileState.paused) {
                _this.audioVideo.pauseVideoTile(tileState.tileId);
                pauseButtonElement.innerText = 'Resume';
            }
            else {
                _this.audioVideo.unpauseVideoTile(tileState.tileId);
                pauseButtonElement.innerText = 'Pause';
            }
        });
        this.log("binding video tile " + tileState.tileId + " to " + videoElement.id);
        this.audioVideo.bindVideoElement(tileState.tileId, videoElement);
        this.tileIndexToTileId[tileIndex] = tileState.tileId;
        this.tileIdToTileIndex[tileState.tileId] = tileIndex;
        this.updateProperty(nameplateElement, 'innerText', tileState.boundExternalUserId.split('#')[1]);
        tileElement.style.display = 'block';
        this.layoutVideoTiles();
    };
    DemoMeetingApp.prototype.videoTileWasRemoved = function (tileId) {
        var tileIndex = this.tileOrganizer.releaseTileIndex(tileId);
        this.log("video tileId removed: " + tileId + " from tile-" + tileIndex);
        this.hideTile(tileIndex);
    };
    DemoMeetingApp.prototype.videoAvailabilityDidChange = function (availability) {
        this.canStartLocalVideo = availability.canStartLocalVideo;
        this.log("video availability changed: canStartLocalVideo  " + availability.canStartLocalVideo);
    };
    DemoMeetingApp.prototype.hideTile = function (tileIndex) {
        var tileElement = document.getElementById("tile-" + tileIndex);
        tileElement.style.display = 'none';
        this.layoutVideoTiles();
    };
    DemoMeetingApp.prototype.tileIdForAttendeeId = function (attendeeId) {
        for (var _i = 0, _a = this.audioVideo.getAllVideoTiles(); _i < _a.length; _i++) {
            var tile = _a[_i];
            var state = tile.state();
            if (state.boundAttendeeId === attendeeId) {
                return state.tileId;
            }
        }
        return null;
    };
    DemoMeetingApp.prototype.findContentTileId = function () {
        for (var _i = 0, _a = this.audioVideo.getAllVideoTiles(); _i < _a.length; _i++) {
            var tile = _a[_i];
            var state = tile.state();
            if (state.isContent) {
                return state.tileId;
            }
        }
        return null;
    };
    DemoMeetingApp.prototype.isContentTile = function (tileIndex) {
        var tileId = this.tileIndexToTileId[tileIndex];
        if (!tileId) {
            return false;
        }
        var tile = this.audioVideo.getVideoTile(tileId);
        if (!tile) {
            return false;
        }
        return tile.state().isContent;
    };
    DemoMeetingApp.prototype.activeTileId = function () {
        var contentTileId = this.findContentTileId();
        if (contentTileId !== null) {
            return contentTileId;
        }
        for (var attendeeId in this.roster) {
            if (this.roster[attendeeId].active) {
                return this.tileIdForAttendeeId(attendeeId);
            }
        }
        return null;
    };
    DemoMeetingApp.prototype.layoutVideoTiles = function () {
        if (!this.meetingSession) {
            return;
        }
        var selfAttendeeId = this.meetingSession.configuration.credentials.attendeeId;
        var selfTileId = this.tileIdForAttendeeId(selfAttendeeId);
        var visibleTileIndices = this.visibleTileIndices();
        var activeTileId = this.activeTileId();
        var selfIsVisible = visibleTileIndices.includes(this.tileIdToTileIndex[selfTileId]);
        if (visibleTileIndices.length === 2 && selfIsVisible) {
            activeTileId = this.tileIndexToTileId[visibleTileIndices[0] === selfTileId ? visibleTileIndices[1] : visibleTileIndices[0]];
        }
        var hasVisibleActiveTile = visibleTileIndices.includes(this.tileIdToTileIndex[activeTileId]);
        if (this.activeSpeakerLayout && hasVisibleActiveTile) {
            this.layoutVideoTilesActiveSpeaker(visibleTileIndices, activeTileId);
        }
        else {
            this.layoutVideoTilesGrid(visibleTileIndices);
        }
    };
    DemoMeetingApp.prototype.visibleTileIndices = function () {
        var tiles = [];
        var localTileIndex = DemoTileOrganizer.MAX_TILES;
        for (var tileIndex = 0; tileIndex <= localTileIndex; tileIndex++) {
            var tileElement = document.getElementById("tile-" + tileIndex);
            if (tileElement.style.display === 'block') {
                tiles.push(tileIndex);
            }
        }
        return tiles;
    };
    DemoMeetingApp.prototype.setUpVideoTileElementResizer = function () {
        var _this = this;
        var _loop_3 = function (i) {
            var videoElem = document.getElementById("video-" + i);
            videoElem.onresize = function () {
                if (videoElem.videoHeight > videoElem.videoWidth) {
                    // portrait mode
                    videoElem.style.objectFit = 'contain';
                    _this.log("video-" + i + " changed to portrait mode resolution " + videoElem.videoWidth + "x" + videoElem.videoHeight);
                }
                else {
                    videoElem.style.objectFit = 'cover';
                }
            };
        };
        for (var i = 0; i <= DemoTileOrganizer.MAX_TILES; i++) {
            _loop_3(i);
        }
    };
    DemoMeetingApp.prototype.layoutVideoTilesActiveSpeaker = function (visibleTileIndices, activeTileId) {
        var tileArea = document.getElementById('tile-area');
        var width = tileArea.clientWidth;
        var height = tileArea.clientHeight;
        var widthToHeightAspectRatio = 16 / 9;
        var maximumRelativeHeightOfOthers = 0.3;
        var activeWidth = width;
        var activeHeight = width / widthToHeightAspectRatio;
        var othersCount = visibleTileIndices.length - 1;
        var othersWidth = width / othersCount;
        var othersHeight = width / widthToHeightAspectRatio;
        if (othersHeight / activeHeight > maximumRelativeHeightOfOthers) {
            othersHeight = activeHeight * maximumRelativeHeightOfOthers;
            othersWidth = othersHeight * widthToHeightAspectRatio;
        }
        if (othersCount === 0) {
            othersHeight = 0;
        }
        var totalHeight = activeHeight + othersHeight;
        var othersTotalWidth = othersWidth * othersCount;
        var othersXOffset = width / 2 - othersTotalWidth / 2;
        var activeYOffset = height / 2 - totalHeight / 2;
        var othersYOffset = activeYOffset + activeHeight;
        var othersIndex = 0;
        for (var i = 0; i < visibleTileIndices.length; i++) {
            var tileIndex = visibleTileIndices[i];
            var tileId = this.tileIndexToTileId[tileIndex];
            var x = 0, y = 0, w = 0, h = 0;
            if (tileId === activeTileId) {
                x = 0;
                y = activeYOffset;
                w = activeWidth;
                h = activeHeight;
            }
            else {
                x = othersXOffset + othersIndex * othersWidth;
                y = othersYOffset;
                w = othersWidth;
                h = othersHeight;
                othersIndex += 1;
            }
            this.updateTilePlacement(tileIndex, x, y, w, h);
        }
    };
    DemoMeetingApp.prototype.updateTilePlacement = function (tileIndex, x, y, w, h) {
        var tile = document.getElementById("tile-" + tileIndex);
        if (this.isContentTile(tileIndex)) {
            tile.classList.remove('video-tile');
            tile.classList.add('content-share-tile');
        }
        else {
            tile.classList.remove('content-share-tile');
            tile.classList.add('video-tile');
        }
        var insetWidthSize = 4;
        var insetHeightSize = insetWidthSize / (16 / 9);
        tile.style.position = 'absolute';
        tile.style.left = x + insetWidthSize + "px";
        tile.style.top = y + insetHeightSize + "px";
        tile.style.width = w - insetWidthSize * 2 + "px";
        tile.style.height = h - insetHeightSize * 2 + "px";
        tile.style.margin = '0';
        tile.style.padding = '0';
        tile.style.visibility = 'visible';
        var video = document.getElementById("video-" + tileIndex);
        if (video) {
            video.style.position = 'absolute';
            video.style.left = '0';
            video.style.top = '0';
            video.style.width = w + "px";
            video.style.height = h + "px";
            video.style.margin = '0';
            video.style.padding = '0';
            video.style.borderRadius = '8px';
        }
        var nameplate = document.getElementById("nameplate-" + tileIndex);
        var nameplateSize = 24;
        var nameplatePadding = 10;
        nameplate.style.position = 'absolute';
        nameplate.style.left = '0px';
        nameplate.style.top = h - nameplateSize - nameplatePadding + "px";
        nameplate.style.height = nameplateSize + "px";
        nameplate.style.width = w + "px";
        nameplate.style.margin = '0';
        nameplate.style.padding = '0';
        nameplate.style.paddingLeft = nameplatePadding + "px";
        nameplate.style.color = '#fff';
        nameplate.style.backgroundColor = 'rgba(0,0,0,0)';
        nameplate.style.textShadow = '0px 0px 5px black';
        nameplate.style.letterSpacing = '0.1em';
        nameplate.style.fontSize = nameplateSize - 6 + "px";
        var button = document.getElementById("video-pause-" + tileIndex);
        button.style.position = 'absolute';
        button.style.display = 'inline-block';
        button.style.right = '0px';
        button.style.top = h - nameplateSize - nameplatePadding + "px";
        button.style.height = nameplateSize + "px";
        button.style.margin = '0';
        button.style.padding = '0';
        button.style.border = 'none';
        button.style.paddingRight = nameplatePadding + "px";
        button.style.color = '#fff';
        button.style.backgroundColor = 'rgba(0,0,0,0)';
        button.style.textShadow = '0px 0px 5px black';
        button.style.letterSpacing = '0.1em';
        button.style.fontSize = nameplateSize - 6 + "px";
    };
    DemoMeetingApp.prototype.layoutVideoTilesGrid = function (visibleTileIndices) {
        var tileArea = document.getElementById('tile-area');
        var width = tileArea.clientWidth;
        var height = tileArea.clientHeight;
        var widthToHeightAspectRatio = 16 / 9;
        var columns = 1;
        var totalHeight = 0;
        var rowHeight = 0;
        for (; columns < 18; columns++) {
            var rows = Math.ceil(visibleTileIndices.length / columns);
            rowHeight = width / columns / widthToHeightAspectRatio;
            totalHeight = rowHeight * rows;
            if (totalHeight <= height) {
                break;
            }
        }
        for (var i = 0; i < visibleTileIndices.length; i++) {
            var w = Math.floor(width / columns);
            var h = Math.floor(rowHeight);
            var x = (i % columns) * w;
            var y = Math.floor(i / columns) * h; // + (height / 2 - totalHeight / 2);
            this.updateTilePlacement(visibleTileIndices[i], x, y, w, h);
        }
    };
    DemoMeetingApp.prototype.allowMaxContentShare = function () {
        var allowed = (new URL(window.location.href).searchParams.get('max-content-share')) === 'true';
        if (allowed) {
            return true;
        }
        return false;
    };
    DemoMeetingApp.prototype.connectionDidBecomePoor = function () {
        this.log('connection is poor');
    };
    DemoMeetingApp.prototype.connectionDidSuggestStopVideo = function () {
        this.log('suggest turning the video off');
    };
    DemoMeetingApp.prototype.connectionDidBecomeGood = function () {
        this.log('connection is good now');
    };
    DemoMeetingApp.prototype.videoSendDidBecomeUnavailable = function () {
        this.log('sending video is not available');
    };
    DemoMeetingApp.prototype.contentShareDidStart = function () {
        this.log('content share started.');
    };
    DemoMeetingApp.prototype.contentShareDidStop = function () {
        this.log('content share stopped.');
        if (this.isButtonOn('button-content-share')) {
            this.buttonStates['button-content-share'] = false;
            this.buttonStates['button-pause-content-share'] = false;
            this.displayButtonStates();
        }
    };
    DemoMeetingApp.prototype.contentShareDidPause = function () {
        this.log('content share paused.');
    };
    DemoMeetingApp.prototype.contentShareDidUnpause = function () {
        this.log("content share unpaused.");
    };
    DemoMeetingApp.DID = '+17035550122';
    DemoMeetingApp.BASE_URL = [location.protocol, '//', location.host, location.pathname.replace(/\/*$/, '/').replace('/v2', '')].join('');
    DemoMeetingApp.testVideo = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.360p.vp9.webm';
    DemoMeetingApp.LOGGER_BATCH_SIZE = 85;
    DemoMeetingApp.LOGGER_INTERVAL_MS = 2000;
    DemoMeetingApp.DATA_MESSAGE_TOPIC = "chat";
    DemoMeetingApp.DATA_MESSAGE_LIFETIME_MS = 300000;
    return DemoMeetingApp;
}());
exports.DemoMeetingApp = DemoMeetingApp;
window.addEventListener('load', function () {
    new DemoMeetingApp();
});
