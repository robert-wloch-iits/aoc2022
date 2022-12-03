import {describe, it, expect} from 'vitest'
import {
  splitInTwoHalves,
  priorityOfItem,
  parseInput,
  findDuplicateItemsInCompartments,
  sumOfPrioritiesOfDuplicateItemsInCompartments,
  Rucksack,
} from '@/aoc2022/day03'

const aoc = {
  puzzleInput: `gtZDjBcmpcDgpZcmmbgtdtqmCGVCGGsvhCFCCqvmCMMM
  JrhfzfLTNfJhPnhQnfzHfCFFQFSGvMFCGQFsQSMSVs
  TllTRrfNNlfzwhtZBZgtRDBp
  vMdwjZdjwjvjdTZZvCcQMGnQMQcbcgLLCL
  rsVhfmssPWzDVGCLJSbCgPLSQG
  lfWNDHDgfszFRTFtwwNjdv
  GLPqVqdVGCLCdczjMjzMfzld
  JnWQvJDmvWBtlMzhrzfHQgcz
  tDtJDDDDtWRRmBwJwWtpPRsGCGScLPGSqspNCS
  ChVzZzfNDzNJmBQfjjJfmH
  MrTMPMncGMJvPPvPWTbrMWvgmBgQwgdpwmdpdpjwpHQcdw
  SPvvvbqrFvMvZzJzsFVzVJNV
  mvBbvMFqbMMVVmtCBHpDdDPTDspdNWPDVP
  zjSfftcQtwtSfQSpNDppsNsjPNdRPP
  fgfStJShrgvvCLLv
  GmFnNNwbFFbhQQGQnGwwwfBgnMMqVDBZVVBMfMVzVz
  vWzRRHzTHcgfZDVfBgfH
  SSTvrvRcPpcvjFGwNGbNpbwQwz
  FFgbZZFZgFmpstLgmbtzqNrwVPlMPlSWWrMPNp
  QQhTvjhcvjjvTcTcTfCcSRwwWzwzPMrzWNNWVVhwrwWq
  GRQBfCRnGGTcDvBfGvffCCjnFZtFFgStJLbLHbFLJZdgmd
  pppdjcrMMRDJLJdRcwRDrwssqHGGDHsZHHsvBVtvmVHV
  nlCFWzGzzQFlSlhGWnPzFbSsBZmsssmVVmsBvnHqvNVqqm
  lFTTTCSQSTrdGJJLJG
  jpsGMgsmghQwQsMmhlQshjtTNTRTnFqRWnnqRfFnnt
  SLBCHrcvZHbSvSZrSvSWnfvVNvftVlFRTqnRTq
  JrzdZbBcHBCrrlHrrSsMgmGpJPDPQmpgQgPG
  cmcZHgwgMgHSLmtjLfWPNNrWBNfffp
  JTqGTsClHslVVRVCVGVJGnBrjdnnrdBNvjPNBNBrWvnW
  VVlQlqTFJlzzlsVGsRCZMthHDbwbFhgcbwHchg
  qgZjgjjbssqgsjlNqjhTtdrfQdTdWLLnDVfHtHWd
  zcGMBDDzcLnztfQQQz
  JSppJcBScMmMFFBRCpRCMmGlggvjhbhlNlglwbslCZjhDZ
  hvhmqcqwwcTBvvwQnRQnRnTRFzFzQz
  jWLPPtPsgMtpdLMLWllpgLLQFQhFJjnVrzFrVFhnRzJJrJ
  WPWffgtSdspdhSMdlSdtfBbHmSvqbNBCCmcBmcvcCH
  frVcrVcggfSZJfbbJvBd
  hwWQnwhWQmQmThTSsdvvSMBTBzcb
  wGnFFCGlQwntGtCtwntwDmFwRgLrHqNRqqcNNgRrHHLggCjp
  wRSwwHDMsRGHvNBNjTgvjgJD
  mcLcFCclWQWQpPQWVQcQcvvNJjrNBTrvgJgBvTRvCg
  VFPbQLchQLSRfbMtdHGH
  lfVrhnlRRqrJZVDJdHSWCvJCJSbj
  BFsgcgMNNQgSvbfCff
  ffNPcMtzqPlnmRGh
  ZJplFmRJmWRJRWmTJCvtTtnLCtndCqtqnr
  SQsVPQHBQZNSNSLCfSLrcLcrrr
  VMjPjbNMDsVHmRllmZpZWmjh
  LcTLRbJhhdhLJbbclfVvfWQVWFRWFFfq
  rZNttSNvtgsPPFsqBFPWQF
  HGCSmHrrwNnHGMLpDhbzzpmJJv
  VlSWzRtWSJqWdfhdqBdF
  mTDHsmmmcHpgrCgCrTsMMtqfsFNsZqfdMZMNbd
  TDcpvrpHCprCpHrmcQvTHgTQzSnLJnPPJlLzwJtRVJwLjJ
  vZSWZJZJFvhZldZHdvvlphZSNGNnmzwCPNHNHGNrrRHGCPmP
  bjfgcbjTQTFQBnGRRBCBNwBnCz
  csqscsbssQLsgQcLgLQLQTQpFdlhdvdZdpZWhJplShWWtq
  QgQvHnfflfBwQCfwlfglnQQccNcRqGGcjmcsGjddwdzsJc
  DhZbTLZTDMVTsRzsqsRjszTz
  FSZVtMLMMWbSgqSvPQlnpH
  MMPllnnBmfSHvBgCLf
  whZjGRJdjcNjjhRjCvgCfbSvCZLHfpZs
  RRWGWwNRWwhwclmrgFmngFPMWm
  VVHQGDGDGsdRrmZBQZRCVHZCNcSTTPMwwvTTwSSNqBqvgMvN
  nfhdLfjFnJpblLbJjWhtnjWPScNnwSTPTPqTvgngNNvSvS
  fpWljtpLjflfLfzlhZGQHZQVddHrrQRDRz
  VCHCjwCwMSZSqQzhhQqcWZJD
  GGGrFFgNRNNgmfnTdgmWQpczvPvQPWQJGDpzzc
  lgTttRTgmfNRntrTTngrCbjCwJCHjLBBHlMVMsbB
  szgPPlCblggVszhLmzvcvNrqpjNqmrqqpGvG
  wBQDtBfQDtFvLjjctLqTMr
  ZFWWdDLQFwSfDSBSQQBWnnnQVdbhgRVbsHzsshbClzzCVggb
  VpVsHVcqcMVMMNHpsspstbMqzBztJZTBBfJfzTvZfvWJWSTv
  mDDQgCQQQHdrwgSvZSmJJZvWfJJf
  drCjggDlPdgrlbjNcnhcHsbpsj
  cNNDRRpDcNcTpppsqHLQGLfRLvHzLH
  lFntJjtbFFlsmsjvnGqHWLfhfqzzQh
  sgPbjBJtPgbPJblblJgbgbwdBTwDCwpwrdZZVcCcDppc
  GGclMjLnnjCMchcChLMLcnnzRFJDZJSRSzzzzDSShszPRS
  VHgFQgwVwfNNpQVfHzQsPPPJDbmZbJDJbS
  HfNVWdHVvgHgVWVNppNWVHwTlvBFcClBCjcTLTlBnnLrTL
  GTLdlJhffQwDRvWLrp
  HVZVNjjsPqzNjNNmNgDWMrRQpWvWRHrDHBWp
  VCqVzjPjCpVqCVPCsbctcnblcGlTbGnlbFJf
  flHdfdBNdZcflBMjqMjBNfZQhvJbGvqvsshJQsJCJDWvvD
  gFTzRRpzRTwbgbLmtCvsJhWsChrWCrtWCC
  VzzzFbVRLPznmRBffPNBHNMdlZfl
  FFFMwCqJFFmrRwgnbLrL
  GpjGpQHQpfjdjDRnLrbrRQmJzzgg
  BphfhDcNcHNvPBvSqJMWJS
  NndbWpDBNbjvWLZqWsWQ
  JPFFTSPfgcMgftQQGjvTmsGqzssG
  gPgcfcVFgcHqSqVhbBCHlpbbpDlhDD
  FSdfWFTTBnjsDCjsmrrT
  pQzLRVLppLGcQjqbmVDJsChCvCbVsm
  qHLRGqqZzGjLqBNMFdnHlNlBFN
  DjqbfBTchDjqqCjjCTWNTbdzSVzGZQGBwZnQnVwpSSnQ
  ssJlPrtvMsRLrrJQGNZJSpZpGzSG
  rlFssHsvPRPMvFmtHvtqjhTgjbqhWqNmNqgDNh
  vcpnRqwwLLbvvcGpDQWDFSCgMrWWQWRR
  gtNfBfllrFlHrlrl
  ZPzftBmsNBNBPJBZPmZPNtmPdGLsqbwqpqcndVLLGpVGvqgV
  vRBfQqqBQPfbrFvPBvPbhLDVDVDQZVVtZtlWLLLt
  jcJmFFwnhJVZLWVl
  sHTcmNNHzncmcjmdsBCrBCPCrBBqCFrqzb
  bbZRnGmNnBGGMNRTgCmWWGGSrvSvFHvzFvFQDF
  LjwphpdPdLpLJVqfJrQzDzfrvQHSvDcQrQ
  DJphdwDsnmbZsTZM
  rdNrZNBSzSztnNzWCcNpHlMwlwHWlM
  QqLGLJvLjtvQWhgHgchHwHJw
  GtjTGtDRqvfLRGnrzsmZmfrVFBrV
  TdMhZrTTNvwphcLL
  WnnmffmDWnWPsPCJNpNcpNVNQp
  fsjbWfFFfnmmDsFDnnflSSdczlMdTHTzTTRRBdtT
  cMcPcMcwgWJMjWWhFWCCQCmqCFdh
  bSLVLblnNnLbVfnsbSbCChSQdChptpdqZrmCmZ
  DLGNfnGVDNDHbfzjRcRgqHMRBJPc
  HVFVlVHjzjjlCJjHjCjnvDrggrgLdqzddMqrzz
  SSfBTmtNdLqngvrm
  TwnNfPWWpBSBNtTHZCGlPHCQJHZHPV
  prvccpFQpMcQBwsvssshdwSTPD
  qbGHVbNJGqwdPgDrTsDJ
  fGbGqqlGGHflqLlzZBBrRcrtrZlp
  fCSPhltMBmPmbdgd
  DjvJJscvTsHHDbWzBWsWbdwgLB
  VVHDZvTppRcJVFFppvvRJDJqMSGqCtZdthttrnthSZMGCr
  ZcSrSdrhDjBDDCmZdZmZjhwVHwqVVsMwgswVVwMfhw
  PNvzTPNbnzcPbGQNJTvqwsWgVgVMMWpQqwgHpp
  JTPGPTzNttnbRTPlPtNNRlFrFmBcmDljjmBFSCmLZZBr
  mNvRRCVMtNRdFNtMtBHHprpHgJgJWwpBnprg
  LZDDlSLlTslDfbcpJJWndwcscnwr
  qdZZGSDhMVRCGtmC
  VGFjjgBShGdGzQczcGRG
  MppqCDfCMwfLDfvNmrtWstRcMPzRMRsRsPQS
  NwDCffLppbqqrqvTBngSbnBHglZllH
  vdllJVDzmVDVqvvWvdqJlcWrCsfCsfSSsSJfCSfQQCCbCQ
  jnTHZPZHMjZhMjTpHgMpgnbNqBstnfrtSSrBSNssCrfN
  LHLTFLjTMTTTwjHhpHTcwmDcWVDlvRDmvqwWlW
  rqQsSStdmsdLqlNNPGlGlV
  FpFpzJNTcHzRHRHlGwFVLFBLFGVvlw
  WCCjWRNJTJWhQhbhrbnd
  jsQjfrRTRwzSsRTgNchlnlhqcnlQmQ
  dFDtdFBDddHLJpVpHHtVbtHFCWlWlGlNlmGggNqgglmcchqb
  dLDHMVdLtBBDBFVJBFthtJHRTvsMSvsTrTSRvPPjPzSwRP
  CSPpSrLlrlPrPchLnSlbDbbRttDVhbGRDDJRtD
  fzfvmzTMmfsFszsHZsHMHVfwtbjBDDGjtRBjQQGGJb
  HmvmTFmqmTsHqzzzzdTsMMScndccdLppnLCSPcCLrVgr
  pfMflRnfrnjrpjnFzDpfDMmMLRTLZVTgLsvdZgLLZHSVWZRd
  tBGNhwPGcNBBWwZddsSTTPgVLPdT
  JwthtwbbhNBQhwhbBCrzpnprnWnprlzWlClD
  PPnZZjnFNDjlJJhtMddfTTdD
  QGLHFWvQJtzfpvCt
  swqSmmQWLQwFWLwwRcqNNBnnbgPqbPNbglVZ
  GCLSjjZGZhpvGtBgjJlnJDhhJMVDPnJlJP
  mNtQQwNzQRHWdJHnPTsddlln
  zQrfmbtNbcQcrzmrRBZqBcvpjSGLZGLZBB
  zGNzgsjDssvNbPlWJfJq
  RLMVSRMLhCLZSMZHDSJWvpcqfbfhvpJqcWPv
  dMVHLFHLZMLRLLFRHHHVZMgDTntgstGwznzGGnzjDFwG
  wCLCHLBwzBtQRLHLbNFFfdqdDqVrVfBN
  JGvljmgGZvMlfDRRnnnZnfND
  GppRlgJlSllSgjMsmllpTjcCLczWztPWPwwwzWThtcQh
  WvHbvvWnFHszDRSltcCctCFD
  gCmJmCCPTPqpgrZtjdRtDRplcSjS
  rJJrQPPJQmrmrhGTznCfLMMbfvWfbCWQ
  TqBWtTbFBNNRRtwQpJJvvvZPpTSQ
  fRMfsMssrGhSmMwSQvvZJm
  VggcVlsCgHnVFnndbbnR
  NdrSSWBNPPSWWHPPlwlLZHLZLMhjlLLH
  pVptMTgVTzLwZTzlbF
  qsRmRJtsMvMqgqgRvCdcSrWSPcWrDmmdBN
  nbJnfqWcmCMnSBSHwzWBsHHz
  dVpdvdppdptppDlvlHcczSgNcgww
  VGTdTVtGtRLFPTDbcfCmmcCQJQjcrT
  VTjrjrjTlTjQMdpGrWMSHvSG
  wnNJbDmttnwnhNwcJmNGdvWvMSfvMfhSSppSdp
  JznFnNsGnzzGFDJsFNmLgVVQZBlLZjQTLTjTls
  hpngHwcpWHgjjfhzTJBfBB
  RFFbFlQlSdRsbRQQMGPRGdSGjBvvNTvzZMBvjzBBTJTvMBBT
  GPSSPDDDFzGlGGRzLzGGPRWqnprcgCHwCHpwHWVcncLV
  LLlLGffQLPRThRwP
  MpZjbmznWqmqZznmzmpZqZnMRgPBCTPfgRTTwTjhwBPPghjP
  VnZpMsMMJnWsmnJpJmzrtFlGQFrHGvSvfHStNV
  MQqHMQPnqmpDdTLLRnDjsj
  NGFzwgtLBtFFGrrCtzgfgCNgSsdTDSSTsdssjDdSlZRjTSBs
  zCwNLthfrbCgzzhqhmccJPhQHVmV
  SndBVcgdqcRBRcdPBBcVcQTSSMLMlTssMNMWsHMsLQ
  GmJvZvhqpvZtNwwWLTTLwMMm
  JFJpzFGZqjvhGZcjBPcCBBPnnVBc
  rJWbqTvwvJNbPDPPvLcZvPDp
  QMnfBsjmFPLcHRDfPp
  lQlMlmtFsMMBstljlnGhtMhmGNqJqTcWNNbWdGwdNNJCrTrq
  LcjcNCQNQWDpRDjRTj
  vWvszVVSsBGWsTJRFHRJTTSTRJ
  vvGbtqbGVVBqtzbqvBdzVLWNLClwnwMLWlQNMfdPQP
  TWBZsWrjzZzWBrBsrrsTLNNJvFnJVmlSFFQnGpmnSJJS
  qdCggdqqqhhqwhRbCwbCPqhlJFPPGJQVvvvnpVVmPnnFvS
  ffgCfghDqDdCsGWZjTsLrsfW
  QzQSSQmzSsLQcLmrcsLzccgqCnwqCtZDnDnrZwgnqTTT
  hFRHHRPRPMtWPGVPRlMljRPCgWBBDTgJBgnwqTZDBZDWDB
  jPjPHRMjjvdjVFhdNfbsbbQfbcddmNtL
  jJlTqMqJtdztJqzcSJSlTdSlprLsRRHwcRRrsrHbrnnRHsHL
  VVVMWNNWmNmLnPLRHrLp
  NGhfvvVWBNfNNCNCQTMqjzgTQBSSSqll
  SSSRMRSRpnMRHLqWLfPlDGlGWldD
  hbNtlmvrNrsVDWsGPfPfqG
  jvbBNmvlJjRcCzHFppCJ
  hhWWPjnBGBGnjqBWSnhhsNLllLNcLczJcqcTlLTlfl
  FHvFFMHwdmvrDbwCbbvHwdHnZTMLzTNTczflJTZclzNLlLcJ
  HdFFvdDvpCDdrnwrGhBQhWRRpsjQWWQW
  sBsvtJtdRdjNbWWrTllqlNgg
  nSZSnPPZzMSnSlScWWWgrVWCrqgrWMWr
  lzSncQcLZLzlwDvtdDdFdFJJhHvJ
  lpsTLDlTtFtlWHPDvvgPfgMrQQJM
  zmNbzcNjzldjwmbdbhhjcjRgfwrgvMwMMSRJSvQQvrRf
  ZhjqcjzNhmzNqBqNznmcWHplCFGnpCtFsGWHHWsH
  ZPGQBFHFbhSrHqtfSrSr
  nMdznzzMDTnjMQrMWtrMptplqpqS
  wzjczJmccTJCmcVghZBJbPBQBbVh
  wLLMJbqSBBnnJhbvbFSSRRlztTrHzrrrrd
  QNNGVPjWPGVqltTHWCqCdH
  sjNGmmGVGgQNGDVmsVpgqQVpMDhvbLwMffZfhZbLnfLLLZwb
  gQLcQrMtBPdwSBsSlmBm
  TfCpTJnTbfqgsgwgppsSzp
  jVbvTnvWfJnJjjbfCjWWjrFPrLMtcDPgLMQQRtgZVF
  gwpHvpgwngGHcnvNvgnmsqCzmMzlfqmmqzHHCm
  JrdSLdBVPRDtRtPfPPzCJhjqmljzmmqszzsM
  SWLDDtVdrZWtSBRZfRcwgFGnpNFpnTnWnTvT
  rpcnHrwrhWccNZDDBBgBVCSW
  nmzFRRjFmmJQNDJC
  qznMlqGnzRtRGvqGFRPrdMhwTpTLfLcppLHp
  wthvbmhmChWMRJLJzngZpzLLNC
  SsdBVjSTjBdffBFfcSdVHfTrnDZGpQgNZHNnLZGpJngJGLng
  sSdTcdVScdcrccjcrBPrBSjcvmRRwlWPhwmqtgWhMPtmMMqR
  CJJBdBCrHdBhtRHctBQhRMrBwZpwZWNZNSNTwSNpQWpZsSSW
  LVFnvnbDjLsDPsPqFFvPvDnTzSTwNwPZpSmpSpgmgZWNTW
  LjlflbFjsvVlrHcrHtrfcChH
  tVLJGNRtfBBNGBrfrbzmfhPsrsPC
  DWWDQHQgllSFqFzcsJmzzSSzmrrs
  MJFQDgMqnHlDvFdGNBNNZGNVVvjV
  wnNwGCBBFNWBqjFBnLLGVDHhHmDPHvZTjTvTrPvD
  bMbttVScMJQtdgSgstbJRSPmrTHmHmrmmSDZlrPrPDhv
  cMbgpsbVbzbdRMRFWLqzBfLGwwwwfW
  JpSnGSGpbGgsWWPHJrdfsT
  MNsRqNNvMQDTLWHlffNHLN
  qqmtRzRvCRRQDqjqjDmsmRpZwSZbcwbnCcCSBBnSSnnC
  TWqlqpRqRptqlRhrmtGGzhbSrSdz
  VgsBVMvgVZfZvPsMVNvfZfvVbSPdhFPFhbzLhJdGFJmLhhhL
  QZgvZgvHwbwHbMsMRllRjDRDnQRqlRjl
  fsPQwnHnHLLfnBBnwwGtjTGRWTWTWwhV
  jblbdjZFDMbGllqTGTtVlq
  gmdMgZMbjpZDcrrDgdmszsPLpQfpBPPnNQNLLz
  HRsPPGMhLPMrnPchPSwStjbSttSvtHSqQw
  dfsCfpCJVJCvdFBFwStwjj
  gTNWmWfTNVZVJzZWpWJgTpfhnDrMnDclgDlDrDRnRcMLDs
  ZQZQJMqdwmZvqfPmwRjpBBjHjnshnjtt
  zcTPTLDTFWLGTrTSWPcDSSHjRlhRsDhHslslssBRljjj
  TrNFLbTWrGNZvmvVQPQV
  htfLgmtSLcTWNLcT
  slbHlBBGbqRsblBHvdNJJcjFFNBTVWWWcn
  bbQsHMMblHrMsGRqvQhwCTQCwtQCzSpfmS
  zmqdphmFmSpTzhdqhFmwjjGbtcvDbcGGjllGQjSP
  HJFrMCsVLrHRRMCNrVMVnctvstlGcQlPtGGjQtGlvP
  RFLHLVWrNgVJzwzwfgffwdfp
  vdMjSmMMpmMWhRpndRmZnhvHqLpGHcJGGGDLHHLGcfcLfc
  lPBwwrsCgLFggcqqLW
  TWszsWNBTNdmSRvjbZZT
  zFlBGpzzzLLNjBwPcwwmcNPfWNQn
  VHSHRJTJDSVVnmcVVPpWmpnf
  DMZHHrDHHrJrrZrShZsHGbMBbFgGjGCgjpFlBzzb
  FVMpsvTqvqMssVsWZSrqWFvwlGDGwQzwfwQQNLzDlwlZwf
  hPbgBHhJJcJPwCwDpNllCCHC
  pnjbBmjgbgmqtSmsTtsF
  DHZHmfTmCfjDZHMZmzffHHnQwwTBdQwbSdBGBQwhBQTQww
  cqstRFWNtLrNFwdVShlBSlhBRl
  StJWpLptNWLtJcpqPrFHDjZzzvnDDHPCZjPvvz
  hzffhGVGGhzRqTBLTqHL
  sFFFsMQlwJMsmrBFSNHTHNqrTS
  pbdsJMdJMJbwbmJJtbTtgnffGgVVChvD
  FvJnFnCpQTddSSmFdFpPPsVhppDjBzjDVhDV
  RgZMZbsgzlDPlhjb
  cHHHRgRZgfHHZGZfHZcLLHrrCrmJCmddrsvdJsmvFFQG
  dpJDdZwLnvdvFmFMmHjslMLH
  CGCztgPhWCWhzzzNNPGfrrWfmbbsmmHjFHDMsbHMsjFPjbHm
  rNQDGzzhCCfNrzrDzChTcZZvQcTRJpTwdvQpVc
  VpvNGhGHGNhHbPsbVbvfFtLCzSCFSBsCFSFCLB
  MlqJwTnrRRrRnMlQMHfHzHzWFWtmTzLWFC
  ljZDDHqqjqRbpNhjNNgcgc
  qrQtDzcQzbrcfdbqrQrthtscSsvpvnsSHpTpLpspmsSs
  CVwNNVRNBSHsLSFBTv
  CVVVNZjlVlGwlGlljNlWJVrrfqbPQQqHqJhhftbfDJqf
  lpmrPDPDjPlmWrVzPztZwFjtFbBnRtZbbcRL
  dnqJCCgQdNqbqRbRbBLt
  QGhGddGCTdMHNTGgshgJhzvSmWWPSsnprpPzWzsWlr
  hCJHTdJJNvTdSSNssjvfwgntwDgtgwDGCtZwtRRB
  mbllFmFMFbMVWWLpbpZwwBZTZnnVwnTggtDB
  MmzLQpFPTmPzHvfJNNzhNs
  dzgBwzlgrrBrVLLlwLBgBlgRScDMMDDswMsHZRGDsZGZmM
  HPfPbjCFJjCvfnnsjsDDcccmZsRSMc
  hCvHfWPPnvJhPWpqNNhqLqzLqLLd`
}

describe('day03', () => {
  describe('splitInTwoHalves', () => {
    it('gets an empty array and returns an empty array', () => {
      const result = splitInTwoHalves([])
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets an array with of a string of equal number of characters and returns an array with two entries of equal size', () => {
      const input = [...`vJrwpWtwJgWrhcsFMMfFFhFp`]
      const expectedFirstHalf = [...`vJrwpWtwJgWr`]
      const expectedSecondHalf = [...`hcsFMMfFFhFp`]
      const result = splitInTwoHalves(input)
      expect(result.length).toBe(2)
      expect(result).toStrictEqual([expectedFirstHalf, expectedSecondHalf])
    })
  })

  describe('priorityOfItem', () => {
    const testData = [
      {input: '', expected: 0},
      {input: 'a', expected: 1},
      {input: 'p', expected: 16},
      {input: 'z', expected: 26},
      {input: 'A', expected: 27},
      {input: 'P', expected: 42},
      {input: 'Z', expected: 52},
    ]
    it.each(testData)(
      'gets string %input and returns %expected',
      ({input, expected}) => {
        expect(priorityOfItem(input)).toBe(expected)
      }
    )
  })

  describe('parseInput', () => {
    it('gets an empty list as input and returns no rucksacks', () => {
      const result: Rucksack[] = parseInput('')
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets a list with one entry as input and returns one rucksacks', () => {
      const input = `vJrwpWtwJgWrhcsFMMfFFhFp`
      const expectedFirstHalf = [...`vJrwpWtwJgWr`]
      const expectedSecondHalf = [...`hcsFMMfFFhFp`]
      const result: Rucksack[] = parseInput(input)
      expect(result.length).toBe(1)
      expect(result).toStrictEqual([
        {compartments: [expectedFirstHalf, expectedSecondHalf]},
      ])
    })

    it('gets a list with two entries as input and returns two rucksacks', () => {
      const input = `vJrwpWtwJgWrhcsFMMfFFhFp
      jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL`
      const expectedFirstHalves = [[...`vJrwpWtwJgWr`], [...`jqHRNqRjqzjGDLGL`]]
      const expectedSecondHalves = [[...`hcsFMMfFFhFp`], [...`rsFMfFZSrLrFZsSL`]]
      const result: Rucksack[] = parseInput(input)
      
      expect(result.length).toBe(2)
      expect(result).toStrictEqual([
        {compartments: [expectedFirstHalves[0], expectedSecondHalves[0]]},
        {compartments: [expectedFirstHalves[1], expectedSecondHalves[1]]},
      ])
    })
  })

  describe('findDuplicateItemsInCompartments', () => {
    it('gets an empty list of compartments as input and returns no duplicates', () => {
      const input: string[] = []
      const result: string[] = findDuplicateItemsInCompartments(input)
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets a list of one compartment with no duplicates as input and returns no duplicates', () => {
      const input: string[] = [`vJr`, `wpW`]
      const result: string[] = findDuplicateItemsInCompartments(input)
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets a list of one compartment with one duplicate as input and returns one duplicate', () => {
      const input: string[] = [`vJrwpWtwJgWr`, `hcsFMMfFFhFp`]
      const result: string[] = findDuplicateItemsInCompartments(input)
      expect(result.length).toBe(1)
      expect(result).toStrictEqual(['p'])
    })

    it('gets a list of one compartment with two duplicates as input and returns two duplicates', () => {
      const input: string[] = [`vJrwpWtwJgWr`, `hcsFMrfFFhFp`]
      const result: string[] = findDuplicateItemsInCompartments(input)
      expect(result.length).toBe(2)
      expect(result).toStrictEqual(['r', 'p'])
    })
  })

  describe('sumOfPrioritiesOfDuplicateItemsInCompartments', () => {
    it('gets an empty list as input and returns 0', () => {
      const result = sumOfPrioritiesOfDuplicateItemsInCompartments(parseInput(''))
      expect(result).toBe(0)
    })

    it('gets a list with one entry as input and returns 16', () => {
      const input = `vJrwpWtwJgWrhcsFMMfFFhFp`
      const result = sumOfPrioritiesOfDuplicateItemsInCompartments(parseInput(input))
      expect(result).toBe(16)
    })

    it('gets a list with 6 entries as input and returns 157', () => {
      const input = `vJrwpWtwJgWrhcsFMMfFFhFp
      jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
      PmmdzqPrVvPwwTWBwg
      wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
      ttgJtRGJQctTZtZT
      CrZsJsPPZsGzwwsLwLmpwMDw`
      const result = sumOfPrioritiesOfDuplicateItemsInCompartments(parseInput(input))
      expect(result).toBe(157)
    })
  })

  describe('solves puzzle #1', () => {
    it('gets the puzzle rucksacks as input and returns the total priority of duplicates', () => {
      const solution: number = sumOfPrioritiesOfDuplicateItemsInCompartments(parseInput(aoc.puzzleInput))
      console.log('puzzle #1 answer: ', solution)
      expect(solution).toBe(8394)
    })
  })
})
