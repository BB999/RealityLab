import re
from datetime import timedelta

def lrc_time_to_srt_time(lrc_time):
    """[00:00.50]形式を00:00:00,500形式に変換"""
    match = re.match(r'\[(\d{2}):(\d{2})\.(\d{2})\]', lrc_time)
    if match:
        minutes = int(match.group(1))
        seconds = int(match.group(2))
        centiseconds = int(match.group(3))

        total_ms = (minutes * 60 + seconds) * 1000 + centiseconds * 10
        hours = total_ms // 3600000
        minutes = (total_ms % 3600000) // 60000
        seconds = (total_ms % 60000) // 1000
        milliseconds = total_ms % 1000

        return f"{hours:02d}:{minutes:02d}:{seconds:02d},{milliseconds:03d}"
    return None

def convert_lrc_to_srt(lrc_file, srt_file):
    with open(lrc_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    lyrics = []
    for line in lines:
        line = line.strip()
        match = re.match(r'(\[\d{2}:\d{2}\.\d{2}\])(.*)', line)
        if match and match.group(2):  # 歌詞がある行のみ
            time_tag = match.group(1)
            text = match.group(2)
            lyrics.append((time_tag, text))

    with open(srt_file, 'w', encoding='utf-8') as f:
        for i, (time_tag, text) in enumerate(lyrics):
            start_time = lrc_time_to_srt_time(time_tag)

            # 終了時間は次の行の開始時間、または最後の場合は+3秒
            if i < len(lyrics) - 1:
                end_time = lrc_time_to_srt_time(lyrics[i + 1][0])
            else:
                # 最後の行は3秒間表示
                match = re.match(r'\[(\d{2}):(\d{2})\.(\d{2})\]', time_tag)
                minutes = int(match.group(1))
                seconds = int(match.group(2))
                centiseconds = int(match.group(3))
                total_ms = (minutes * 60 + seconds) * 1000 + centiseconds * 10 + 3000
                hours = total_ms // 3600000
                minutes = (total_ms % 3600000) // 60000
                seconds = (total_ms % 60000) // 1000
                milliseconds = total_ms % 1000
                end_time = f"{hours:02d}:{minutes:02d}:{seconds:02d},{milliseconds:03d}"

            f.write(f"{i + 1}\n")
            f.write(f"{start_time} --> {end_time}\n")
            f.write(f"{text}\n\n")

if __name__ == '__main__':
    convert_lrc_to_srt('ai_studio_code (1).txt', 'subtitles.srt')
    print("SRT字幕ファイルを生成しました")
