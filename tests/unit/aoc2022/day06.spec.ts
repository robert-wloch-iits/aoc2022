import {describe, it, expect} from 'vitest'

import {
  findStartOfSequenceMarker,
} from '@/aoc2022/day06'

const aoc = {
  puzzleInput: `zcncrcnrrlccmhchssgqsqrsstfffnqfnfsswgwjjcmcnnvjvwjvwvfvnvwwhvvwmwhmwwwhbhhldhdmhhdfdbdfbdblllnfllgslllqhlhfhlhqllncnfnsffwmwzzlglzlwlhwwmvmddpvvbrvrdvrdvdhhzdhdpdzzbgbsssrpsrshrshhbqbgbmmtwwcbcrbbvnvhnncscwcwlcwlwnwswbbnwntthzzdlzdzffvqvdqvvtptdptphpddzzvhzvzwwqgqjjjvsspvspsbsffvpvcvjcvjvrvjjgmjjhrrdhhdvhvttjttzptpssnlnjjlnnhmnndjnjwwtjjtbbfflwfwgwvvpjpwpcwcgglmgmdmnmbbqtqctcwcmwwvmvlmvmdvdvhvlhlzhzttghttnvnjntnqqtmtwwhvhrhfhchqchhdrdllnwnfwfjjmsmmnhhshnhpptstjjpnpzzhmmpssgrsrzsrrffzjjhvjhjcjcpcvpccfnfjnfjfllssrdsdnnmffldldppcctcmtctffprpsrrrfhfmflldccnpppvsswppdgpgjpgpqgpqpjppclcjczcnzzzqvzzwlzzqfzffsqqphqhvqqbcccstsdttwcwcvvmjjhqqmllpglgtgwgnnbnrbnnjdndhhbrbvrvwwwblwwwppmdmttztqzqrqjjpggpmgpmpqqmssvnsvnndnvddtztddrrsnsbbshhqmhqmmdnnrsrllqvvfjfpfqpqfqflqlmqmrrqgrqrrhvvfddfhhfnhnlncnzzwwjwswpsscpchcssrzssjqsqrsswbbzggnqnwqqsrqqzbqbddtffcjjdggwlwnwtnnpddcqddsppcwpcwpphvphhhrprqrqttwgwqwppvdpvvrgggmpmddzvvwwthwtttbqtbbftfrffbdfbbspshphpwhppnhnmhhbbshbsbmbdmmtrmrbrprbprphhnmhmvhmhhqqbvqvqcvcwcbwcchbbgwwqffrcffsvvcczrztrzzdhdmhdmmzbbvlvqqtptpvvfsfppdzppmddfvdfdwdfdmdwwlvvqdvqdqmdqqmnmdndsswsfwfvwfwzzhrzhhwfhhpvhppmssnhsnsnwswvwlwdwzwnwswwmqmjmbbdjdbbtllcpllltqlttnvvppznpnttlrrwlwvllphpbblccgjcggbtbwtwdwrrbnndpddbqqnpnrnnqqshspsggtptztpzzclcggtqtgqttcmmbgbfbdfdfsddlrlvrlvvmqqgbqgbqbcbbnpplqqblqbqmbbbdqbbhjjcgcdgdwdjwjqqlsqqnnwffglfglgnlggjgjtgjtgjtgjjclcwcqqvpvwwvgvhgvhvjjzpzbznnvrrrpbpdbdhhmshsnnnwppcbcvvlldccdggqnqgnqqzbzzcfflnnmppcgcmgmrgmrgmgngwwptpzzpfzpfzpzdppgcgtcgtgccvtctzzdmzmlmzlzwllbplblltgtctrrghgvhgvvfvssngsschshrhvrvddghgwwwwzgwgvgccjdjzjwwvdvvqsqshsvvddmddbllvppmlpmlmwlwppjmppwrrdzrrpmrmrdmrmbmzzwttvwwsfswwlflnlrlvvdllzbztbtpbtppnjpnpdnnjrjsshtssvvsjvjfjwffsszvsvjssqzsslpslppjpspqptbncvzrlwtjvsrwtnzzhwdfsmlthvgqgjrpshpbsrrvnsdbqslbcplnpcjqwmwqsnwdcjsdmccbdglwbrcdcqsfhjqhstvhqqdwltqwhhqcrnpvnzjhhbjvqbqhclwggjqfvnfsvcnjjhbmrvbpjqrbljbtltvnsgdfhddlmsdhcrfwvlvbsdrjwjvtnqzhrlqgjmzsmjlpdjsrjmdhmvgwjmfwtqffnzfrtswrlgvvhhqgpzcjwscfqgjmdhtvbgzdlvzfhgqlqbfwsjrmmhrlcwhrcnwwvngcmsrfgczsfqvvmdtmtprfvjrwrwcqwvgmzcjncrzvcswlzsdszvdtwmptnrhgzqwrhjjtbchhpwsdjnqmnsgzwqzvlzlsznpqgvtqnldjqpvndtsjlzhpzsgthbwvwnlbwjlmndqpcdvjdgdzhctpghlfwrtqtvfwdpgrjbmwzqgthjpmlrsqmzsznddhrbjnggqrdntpbngvldnnltfnmdwfhftjvpqbrzqvdzbzzctshzldtcdgfnczglrrjtwswzdvjrfgwztwznbpplmbgwpcmstcsjtqhmzmzsjwsfbjlbnbdtdsmlpdmrrbhdhpzrjdpzhcwsrgfrhmqzqtjfhpvltnthwjrrrpnsbmmwrhsfqbmnvwhpntltsgwgnqhcvlndfrtrfrnlmbhltmtgzhlzqgtsbbnggdjvbslfbczhpghqqcqlrbtpnbqbflfjrmpmwwvjqgvcqtmfggmptqlqstcmdtqlslnnzwbgnstftfsvsjdrmgbzfnzltwbjmqhsvshnmwhftjdndltdpngzwbrjpgpwmqgfsflnhmtzcmdjmzwrsrrrmpvwgggwrhrwtfwdbgbpmwpcdspdtbqvdwwsnwdtrtdtgnfzzsmlbcqdzbsqnrgtvvnlfcdlcgcnfpqbddqcjfqtmpndmnwvfqgjzrltqvlprmbbhmtwbzjjgfhhhfjswpffmjnsdmrcjrwlwpmfrmhljpphlwwwwmgsjcsrcvmfrdjdhshddshpplzsnsphcmdhvllgmdgrvbvjmtpltdthffsvwwhvgqrhmfjfpdswcqldrhpmznffjsntwrnmnpmsshljszbchctptsdlnbcvpfvtlfnzcrljpdwrsjnlpqcpnwvnqhzhqmjbvlbtgslzthlbbjzsgdglbrltzjdshpfbndjtssvsjqlstnrjdzzjvlpqhmwvrsvndcqrqjjcsqvmvrbhngtcfdprlbnqmhqllddgjpdzbjlphntrtgjrdgtbslrtzczbnnlddzzsvqvqvvzjpjqfhztgtsfggdppfdhzsbjzqjmpnmgqzlsdhjjbfpbsbnzpmhwrzjqhczrgcsflfwtrgwbnbrshjpwltntsnsdhmhqlmzdprcrcpcpjnphsmjwhzdqtncdbwgspmnfzsgmpbdhmslqchhhbbwfrghhnfjplsvrtbvplgrwdnbnfsgpwrqczvzlnfsngnsnbwvpmfdcmjztdnrllslnwcfwwnwsvztqmgqtfvmdqrrrmwfmphbcvwwttpmwjjbvqrmlwtwfsjdpcbmdlnlzcqntfzzmslshwprjfhwwpbbdfcdjwllfwcznwpjpwrlsfnnbgzjllrgtzcdcvhdhbtlrcvfdvsdjlzsmwwqvpzfhzjlqpfbqstvfrpcchmtwgbrhqqbglrvzmctdlpnvmglgdtzpbdngtfdnmsmwbgjstzbqwqcdlhfrtqqnhqvpfhdrjqvsvstftdgwwnwpfbfbdcfqnqlwpdnfhhfctwrgdqpbpbmgnfsnbpjfctvdtjnsfqlrtctrnjgltndngcmrdphhsqpjhprbngjzqqhnhhrdwlwwpmhzwshvrtzfgzlrhwghvpvfprbbvflltplpptvrmwcrdqndfqbfqtlqqwvphsmcvnbzghvsptrphhfcgdsslhfbcwhtjcmnpbvqrfgpsjgqpnnwwhjjwqrhhqgznwdzjqbtmmjljjwctqtfgwqbdrjwqwbbcftvjwfdfrgvsrlcrccpvfzdrcjvqfbhddpvrrhjrmhdgchrghbzsqpmgnmslfctblwlvphdfpvtdtwpdfsjwssmgnsvsqpdbqngccsplhmjbwjwtzwsbjhwpwcslqjdchmbvzrbgnwvjrrrdtvhtlzlrbwthzlhhqzzpvpwbzrrbrbtpwnhldhqqltqrqdddfwdmjzgctnlrjrjwvddfmjpnptdmrvnqjvsjfrmlvlqsthhsbvnjlsdzrjngfnqdjfssmvgrchbwmwbbvfqfhvrtwghmrpddnwbrbvbmqvfzbjdsnbzgrtmsfhmsmjtrqsgmpnwwbfwtp`
}

describe('day06', () => {
  describe('findStartOfSequenceMarker', () => {
    const testDataStartOfPacket = [
      {input: '', expected: -1},
      {input: 'bvw', expected: -1},
      {input: 'bvwb', expected: -1},
      {input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expected: 5},
      {input: 'nppdvjthqldpwncqszvftbrmjlhg', expected: 6},
      {input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expected: 10},
      {input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expected: 11},
    ]
    it.each(testDataStartOfPacket)('gets "$input" as input and returns the start of packet $expected', ({input, expected}) => {
      expect(findStartOfSequenceMarker(input)).toBe(expected)
    })

    const testDataStartOfMessage = [
      {input: '', expected: -1},
      {input: 'bvw', expected: -1},
      {input: 'bvwb', expected: -1},
      {input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', expected: 19},
      {input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expected: 23},
      {input: 'nppdvjthqldpwncqszvftbrmjlhg', expected: 23},
      {input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expected: 29},
      {input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expected: 26},
    ]
    it.each(testDataStartOfMessage)('gets "$input" as input and returns the start of message $expected', ({input, expected}) => {
      expect(findStartOfSequenceMarker(input, 14)).toBe(expected)
    })
  })

  describe('solves puzzle #1', () => {
    it('gets symbol sequence of the puzzle as input and returns the number of characters until the first start-of-packet-marker', () => {
      const solution = findStartOfSequenceMarker(aoc.puzzleInput)
      console.log('puzzle #1 answer: ', solution)
      expect(solution).toBe(1723)
    })
  })

  describe('solves puzzle #2', () => {
    it('gets symbol sequence of the puzzle as input and returns the number of characters until the first start-of-message-marker', () => {
      const solution = findStartOfSequenceMarker(aoc.puzzleInput, 14)
      console.log('puzzle #2 answer: ', solution)
      expect(solution).toBe(3708)
    })
  })
})
