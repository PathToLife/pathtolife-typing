import gzip
import json

WordList = list[tuple[str, int]]


def read_gzip_wordlist(fp: str) -> WordList:
    word_list: WordList = []
    with gzip.open(fp, "rt", encoding="utf8") as f:
        lines = f.readlines()
        word_dict = {}
        for line in lines[1:]:
            word, freq = line.split(",")
            word_dict[word] = int(freq.strip())

        word_list = list(sorted(word_dict.items(), key=lambda x: x[1], reverse=True))
    return word_list


def get_top_words(word_list: WordList, n: int, min_word_len=2) -> WordList:
    out_list: WordList = []
    i = 0
    while i < len(word_list) and len(out_list) < n:
        word, freq = word_list[i]
        if len(word) >= min_word_len:
            out_list.append((word, freq))
        i += 1
    return out_list


if __name__ == "__main__":
    NUM_WORDS = 1000
    OUTJSON_FP = "wordlist.json"
    IN_CSV_GZ = "top_english_word_freq.csv.gz"

    word_list = read_gzip_wordlist(IN_CSV_GZ)
    top_words = get_top_words(word_list, NUM_WORDS)
    print(f"filtered {len(top_words)} words, writing to {OUTJSON_FP}...")

    output = [x[0] for x in top_words]
    with open(OUTJSON_FP, "w") as f:
        json.dump(output, f, indent=2)
