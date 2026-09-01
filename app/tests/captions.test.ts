import { parseCues, timecode, runtime } from '../utilities/captions';

describe('parseCues', () => {
  test('reads a plain cue', () => {
    const cues = parseCues('WEBVTT\n\n00:00:02.000 --> 00:00:05.000\n[birds chirping]');
    expect(cues).toHaveLength(1);
    expect(cues[0]).toMatchObject({ start: 2, end: 5, text: '[birds chirping]' });
  });

  test('survives a byte order mark and CRLF', () => {
    const cues = parseCues('\uFEFFWEBVTT\r\n\r\n00:00:01.000 --> 00:00:02.000\r\nrain');
    expect(cues[0].text).toBe('rain');
  });

  test('an identifier opens a chapter', () => {
    const cues = parseCues('WEBVTT\n\nSong structure\n00:00:14.000 --> 00:00:22.000\nphrase');
    expect(cues[0].chapter).toBe('Song structure');
  });

  test('a voice span names the speaker', () => {
    const cues = parseCues('WEBVTT\n\n00:01.000 --> 00:02.000\n<v NARRATOR>Below four metres.');
    expect(cues[0]).toMatchObject({ speaker: 'NARRATOR', text: 'Below four metres.' });
  });

  test('skips NOTE blocks and empty cues', () => {
    expect(parseCues('WEBVTT\n\nNOTE recorded at dusk\n\n00:01.000 --> 00:02.000\n')).toEqual([]);
  });
});