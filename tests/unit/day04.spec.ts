import {describe, it, expect} from 'vitest'

import {
  createAssignmentType,
  AssignmentType,
  createAssignmentPairType,
  AssignmentPairType,
  isContainingOtherAssignmentFully,
  parseAssignmentPairs,
  countFullyContainedAssignmentPairs,
  isOverlappingOtherAssignment,
} from '@/aoc2022/day04'

const aoc = {
  puzzleInput: `36-92,35-78
  26-31,25-27
  17-72,16-71
  3-77,76-90
  20-22,21-87
  5-75,6-75
  42-44,43-95
  51-73,50-52
  81-89,80-81
  7-58,47-58
  72-91,20-92
  27-64,51-64
  5-94,94-95
  88-93,88-89
  7-45,46-91
  30-40,29-29
  81-90,80-90
  4-71,4-71
  68-83,65-84
  1-4,3-79
  94-95,35-82
  30-84,31-97
  6-82,81-86
  88-88,4-89
  41-97,40-89
  95-99,34-94
  18-56,18-56
  53-64,22-53
  5-9,9-71
  18-41,40-66
  38-39,38-78
  23-99,22-94
  34-54,34-53
  33-76,85-94
  72-91,63-79
  33-94,93-94
  56-82,20-56
  60-85,60-86
  31-76,31-33
  29-79,78-80
  9-9,66-69
  6-97,6-75
  40-78,39-77
  14-30,14-15
  91-94,88-98
  1-23,10-23
  9-84,7-9
  75-76,75-98
  45-87,45-46
  11-11,11-11
  16-64,64-65
  60-60,20-61
  48-81,93-94
  5-48,32-47
  37-75,74-75
  13-76,13-13
  15-93,92-96
  41-86,86-96
  48-92,64-91
  1-9,2-97
  43-56,55-55
  7-99,98-99
  98-99,1-99
  15-97,7-99
  76-76,32-77
  71-76,76-77
  13-28,13-29
  38-69,42-50
  49-49,50-77
  68-84,71-83
  26-51,32-51
  12-40,39-63
  21-92,9-88
  7-65,65-69
  56-76,56-77
  40-62,62-62
  35-96,92-95
  37-99,12-86
  94-98,4-81
  32-38,34-39
  11-94,24-93
  1-97,1-60
  7-77,7-59
  62-81,80-96
  38-83,82-82
  44-44,43-98
  22-23,22-62
  28-97,16-97
  53-88,67-88
  2-2,56-97
  41-72,71-72
  78-80,47-79
  1-1,2-41
  23-99,33-98
  33-98,61-97
  80-95,80-80
  8-90,8-91
  4-90,50-89
  94-94,3-95
  3-83,2-99
  45-52,12-44
  22-65,66-71
  9-72,72-73
  2-62,2-82
  40-61,30-60
  57-87,25-56
  76-78,77-77
  16-88,87-88
  14-77,73-77
  37-90,36-38
  10-75,11-11
  37-99,3-97
  47-48,45-47
  6-92,7-91
  60-74,60-61
  20-29,8-21
  95-96,47-95
  63-70,31-63
  6-97,6-76
  19-91,19-92
  50-92,49-50
  17-96,18-97
  3-4,3-93
  13-51,1-13
  34-87,23-33
  2-99,98-98
  4-6,7-76
  46-60,36-45
  50-80,25-51
  60-61,24-61
  97-98,3-98
  33-34,83-99
  30-76,22-77
  27-72,72-94
  47-96,31-47
  26-90,11-27
  47-87,3-72
  86-91,9-87
  32-79,78-79
  72-95,94-94
  88-96,8-89
  11-84,12-98
  5-8,8-29
  6-38,86-86
  14-33,5-33
  20-95,39-94
  6-99,12-93
  52-91,52-90
  3-99,2-72
  72-96,56-90
  7-84,7-8
  20-37,14-37
  26-74,74-75
  40-54,4-71
  42-42,93-94
  53-69,23-52
  20-96,95-96
  1-18,18-83
  2-3,2-69
  36-87,87-87
  8-94,8-94
  59-99,59-60
  15-35,11-35
  6-26,5-26
  7-12,11-80
  79-79,79-79
  2-47,46-47
  76-96,96-97
  12-79,11-77
  45-71,46-94
  62-63,62-94
  30-84,84-85
  9-35,9-13
  18-60,18-61
  13-90,13-85
  2-38,1-2
  76-81,24-54
  48-49,48-95
  59-92,58-69
  72-72,15-73
  15-16,15-99
  79-85,60-86
  58-58,46-59
  55-60,3-54
  22-26,26-58
  6-86,7-85
  66-76,47-66
  52-73,52-53
  21-76,20-77
  44-73,16-77
  29-80,30-30
  15-47,14-16
  3-75,1-3
  55-61,9-56
  37-55,36-82
  64-83,83-84
  9-91,41-89
  22-86,33-85
  6-19,5-34
  80-92,93-93
  99-99,85-98
  96-99,14-97
  2-72,5-59
  93-94,56-94
  34-83,34-86
  33-34,34-73
  17-84,18-44
  82-83,26-83
  3-85,18-84
  88-88,9-88
  93-93,27-94
  12-13,12-14
  8-90,8-42
  78-86,41-77
  63-79,80-81
  15-66,14-16
  77-77,28-76
  9-96,8-10
  19-78,77-79
  13-95,72-93
  13-49,14-14
  84-85,84-95
  25-37,25-37
  49-93,49-91
  24-78,5-38
  2-92,2-92
  17-90,16-90
  8-50,8-50
  76-99,76-98
  71-86,77-86
  70-71,54-70
  8-84,39-84
  40-58,55-58
  8-87,1-9
  5-7,6-85
  25-97,24-25
  9-97,14-96
  17-48,10-47
  81-87,30-80
  3-83,83-84
  2-7,6-42
  20-70,70-93
  67-85,17-61
  7-18,6-20
  21-73,20-22
  80-81,18-79
  43-95,44-96
  38-45,44-44
  15-91,90-91
  32-44,34-43
  24-93,24-25
  10-16,11-12
  22-92,61-92
  3-7,6-73
  72-79,71-74
  34-47,34-46
  56-96,75-82
  31-48,48-81
  54-81,53-82
  2-91,93-97
  41-74,10-40
  51-63,52-86
  80-90,75-90
  86-87,10-87
  80-94,84-94
  46-47,9-47
  20-77,78-92
  38-38,17-37
  30-76,5-30
  6-58,58-77
  10-73,74-85
  1-96,2-31
  64-73,4-74
  60-79,59-77
  4-98,8-89
  7-9,8-78
  4-6,5-95
  29-93,53-90
  32-94,20-33
  78-91,38-79
  10-95,96-99
  5-97,86-96
  6-65,5-64
  28-71,7-72
  15-54,45-53
  3-87,46-99
  1-90,40-90
  44-86,19-86
  3-94,93-94
  92-93,1-93
  93-93,42-94
  90-97,21-91
  16-94,16-62
  20-27,79-86
  28-28,29-39
  30-94,29-30
  28-68,76-79
  54-73,54-55
  35-36,35-87
  5-42,43-47
  10-90,8-91
  15-74,23-49
  16-97,1-98
  2-82,82-89
  1-3,2-86
  16-87,15-86
  9-10,9-60
  14-90,10-14
  36-85,5-85
  36-41,37-89
  50-50,15-50
  82-86,85-86
  28-66,28-32
  15-84,14-14
  32-69,31-33
  31-95,30-96
  60-85,61-92
  10-87,86-87
  96-99,5-97
  97-97,39-96
  34-35,3-35
  51-88,33-88
  14-49,48-90
  4-51,52-56
  7-76,31-75
  3-99,3-87
  29-86,29-75
  61-64,61-65
  85-97,13-86
  59-67,6-58
  51-97,44-50
  21-64,64-93
  9-56,10-81
  20-51,50-51
  33-87,32-87
  18-79,5-90
  51-51,22-52
  24-83,21-25
  79-93,24-94
  14-14,13-83
  43-49,44-50
  72-72,10-73
  14-57,35-57
  4-63,3-4
  4-93,26-91
  26-93,25-26
  33-35,33-43
  36-87,87-92
  27-69,6-70
  38-60,30-39
  96-96,1-95
  2-96,99-99
  16-87,88-88
  41-52,41-51
  61-77,76-82
  9-77,3-10
  39-50,38-51
  12-63,12-62
  17-30,18-76
  22-86,22-23
  3-43,2-44
  21-66,66-66
  3-64,2-2
  60-65,60-65
  7-42,74-96
  81-98,38-98
  16-24,17-23
  95-97,32-96
  23-38,23-37
  42-54,40-46
  16-18,13-17
  1-81,3-63
  16-17,17-50
  82-87,88-97
  6-47,5-48
  8-81,92-94
  95-97,11-96
  23-94,22-86
  6-35,3-56
  7-93,90-92
  6-49,3-6
  24-86,86-86
  67-78,67-78
  11-98,10-96
  87-88,17-88
  8-98,99-99
  15-73,72-73
  1-60,60-60
  39-45,33-45
  77-95,41-76
  5-23,24-99
  96-98,97-97
  18-55,55-56
  97-98,60-90
  33-34,13-34
  7-96,8-96
  7-32,46-61
  75-93,20-96
  30-99,29-31
  4-99,3-97
  3-30,29-30
  40-40,39-63
  48-49,48-60
  22-24,6-22
  28-28,3-28
  64-64,37-63
  29-48,5-48
  20-37,19-36
  77-77,19-77
  18-85,2-19
  99-99,30-80
  35-36,31-35
  28-79,75-98
  26-94,26-95
  22-97,73-96
  42-42,5-41
  6-8,7-99
  10-14,13-14
  39-72,39-73
  12-90,89-90
  93-94,12-94
  50-88,89-93
  47-88,88-89
  39-64,38-38
  15-79,78-79
  28-32,32-33
  50-65,51-51
  7-79,6-64
  33-49,32-34
  82-95,75-96
  6-14,4-9
  95-95,10-96
  14-51,3-15
  97-98,21-98
  39-61,53-61
  68-69,37-68
  15-73,73-95
  42-70,43-83
  1-60,60-61
  6-11,11-94
  10-79,87-93
  36-40,41-41
  3-17,3-43
  4-81,4-82
  90-91,6-90
  2-3,5-68
  20-98,74-97
  4-86,3-85
  47-49,23-48
  26-89,26-90
  31-42,42-47
  57-81,39-58
  17-87,18-96
  9-77,9-78
  79-88,80-84
  30-84,83-83
  15-89,15-88
  11-11,10-94
  59-82,27-59
  8-78,14-33
  46-95,85-94
  93-97,92-94
  4-34,2-3
  34-80,30-82
  48-83,27-49
  47-99,47-48
  27-51,51-56
  48-49,35-48
  31-51,42-51
  96-97,19-96
  43-44,20-44
  76-76,13-75
  5-90,27-90
  26-27,27-51
  47-54,49-95
  69-72,4-73
  94-98,68-95
  1-2,3-86
  25-90,24-26
  28-90,89-89
  91-91,74-91
  56-95,40-57
  55-92,28-54
  28-34,27-35
  85-87,28-86
  8-10,10-98
  45-45,44-44
  31-83,27-59
  67-84,2-68
  17-69,51-69
  49-52,34-53
  22-81,2-23
  95-96,2-96
  82-99,17-82
  40-57,40-58
  9-40,40-40
  1-2,3-68
  1-97,90-97
  2-20,21-34
  2-2,1-92
  84-86,2-86
  7-92,97-99
  2-6,5-42
  1-52,1-52
  98-99,1-98
  38-80,29-43
  39-69,39-39
  97-99,3-98
  70-71,8-71
  26-52,25-38
  8-92,91-92
  12-49,13-27
  7-95,94-95
  91-99,15-92
  19-45,18-19
  75-76,76-97
  59-74,13-86
  3-3,2-3
  41-60,53-59
  75-99,29-96
  66-68,18-67
  3-91,3-95
  33-98,32-34
  5-78,10-77
  55-95,54-59
  6-81,6-81
  78-94,52-75
  20-93,10-94
  12-37,83-99
  46-93,92-99
  17-79,8-94
  45-99,46-46
  73-90,68-73
  82-83,58-83
  15-88,90-94
  66-96,18-65
  12-87,61-86
  35-85,36-84
  96-96,28-95
  82-95,2-83
  1-2,2-99
  59-88,59-60
  54-90,53-74
  35-48,57-57
  16-28,16-29
  35-45,36-36
  25-39,24-58
  19-74,27-75
  35-73,31-36
  16-76,6-87
  8-99,7-97
  1-1,1-89
  9-74,10-75
  12-74,11-56
  80-81,2-80
  13-97,19-92
  43-83,82-89
  55-59,60-60
  20-79,98-98
  61-62,61-86
  35-82,93-97
  21-42,43-43
  49-94,43-50
  5-81,98-99
  5-95,1-95
  6-80,91-97
  26-85,11-25
  34-68,19-48
  3-99,3-87
  81-81,19-81
  8-47,8-48
  46-70,46-71
  13-73,46-73
  13-83,14-82
  6-97,96-99
  19-33,18-34
  30-99,2-99
  50-84,1-84
  6-97,6-96
  96-96,6-96
  10-96,9-94
  38-39,38-43
  18-94,19-97
  86-86,87-91
  8-98,8-97
  84-86,78-85
  23-71,72-72
  5-99,98-98
  26-75,26-75
  87-87,20-88
  11-85,7-8
  52-61,45-62
  42-97,42-97
  25-89,21-24
  95-96,4-93
  66-69,67-68
  2-93,94-96
  8-9,9-81
  72-97,21-98
  59-75,58-60
  14-16,15-96
  71-71,70-71
  10-79,3-10
  54-54,53-98
  2-4,3-69
  14-66,14-67
  16-17,16-65
  27-99,76-99
  19-94,95-97
  3-83,83-84
  36-57,31-56
  34-83,33-83
  56-67,66-88
  30-70,17-31
  24-80,79-80
  43-52,42-43
  10-65,66-68
  50-69,1-70
  10-10,10-33
  10-99,9-98
  86-96,85-85
  30-65,31-60
  18-81,17-19
  12-84,49-71
  19-98,18-18
  3-67,4-68
  88-99,69-99
  11-87,10-11
  98-98,37-85
  8-90,47-89
  2-43,67-79
  5-5,4-97
  31-94,93-96
  13-83,14-14
  72-85,71-84
  51-53,26-52
  3-58,57-62
  41-58,41-58
  29-84,30-56
  89-98,21-90
  51-97,50-94
  8-96,8-95
  1-4,4-81
  23-51,52-95
  29-61,8-60
  11-15,1-5
  2-75,7-75
  42-66,46-66
  53-93,53-94
  5-99,3-6
  2-5,6-13
  65-97,46-99
  51-72,50-90
  36-65,64-66
  1-4,4-94
  7-8,7-86
  4-89,3-90
  61-98,60-62
  40-81,19-81
  28-73,27-73
  4-98,6-97
  63-73,63-89
  13-97,96-98
  5-13,13-88
  24-92,7-92
  15-31,14-28
  2-88,97-97
  11-45,11-45
  40-82,82-82
  51-51,50-60
  84-91,21-83
  71-98,71-97
  21-95,31-94
  1-97,1-41
  2-3,2-84
  3-4,4-91
  98-98,17-97
  15-15,16-84
  43-48,11-37
  13-83,11-15
  88-96,3-96
  55-91,24-55
  4-96,96-99
  66-82,80-80
  3-61,62-93
  99-99,11-70
  56-56,57-59
  40-40,39-99
  57-58,35-58
  36-95,94-94
  2-63,64-81
  18-24,24-62
  63-98,12-63
  81-81,18-80
  19-61,19-20
  11-18,11-22
  9-14,9-11
  6-7,6-85
  41-51,41-41
  18-43,17-19
  8-70,71-84
  76-76,11-75
  87-88,9-88
  55-73,54-56
  56-57,57-68
  4-11,11-88
  8-81,11-80
  25-70,71-71
  22-45,23-48
  14-84,5-95
  58-68,47-58
  17-66,38-66
  58-89,88-89
  7-28,14-27
  31-87,22-63
  92-96,39-91
  14-41,14-14
  62-65,3-61
  48-66,48-66
  4-95,2-96
  7-7,8-77
  17-50,18-51
  80-89,14-79
  28-50,28-89
  32-40,7-40
  19-77,18-19
  34-60,1-6
  33-50,51-91
  16-17,16-54
  29-45,19-32
  36-42,37-37
  1-95,3-87
  70-93,92-98
  4-11,46-79
  20-82,1-19
  40-41,2-42
  75-77,31-76
  8-14,14-78
  69-91,68-69
  9-63,77-89
  47-70,39-47
  3-98,97-98
  84-84,30-84
  9-9,10-95
  24-24,23-92
  27-95,21-95
  2-99,2-99
  38-59,54-59
  20-81,15-82
  6-73,13-73
  98-98,99-99
  18-92,17-19
  93-94,5-93
  13-99,13-14
  34-34,34-79
  12-88,87-96
  55-67,83-89
  6-30,1-31
  24-80,24-80
  5-90,16-91
  49-68,10-49
  11-14,13-92
  23-85,24-92
  67-81,67-68
  32-99,32-89
  85-86,35-84
  21-21,20-60
  25-85,25-84
  20-56,21-21
  6-9,9-71
  82-98,26-81
  37-37,15-38
  5-97,3-5
  11-18,19-26
  14-69,6-83
  51-73,50-75
  29-85,19-28
  8-59,5-60
  92-92,46-93
  8-57,7-9
  16-16,16-84
  10-32,10-11
  1-86,1-86
  26-98,19-91
  7-97,6-94
  41-81,42-80
  3-97,13-98
  24-25,24-87
  54-54,18-55
  49-49,33-50
  6-80,79-80
  38-95,38-95
  52-84,52-77
  6-92,1-6
  1-3,3-88
  6-71,2-5
  16-46,2-17
  79-86,15-80
  6-6,5-54
  8-41,11-40
  53-98,52-54
  2-79,1-3
  51-70,50-52
  55-55,56-69
  4-61,10-97
  75-92,12-76
  27-79,92-94
  6-55,5-7
  19-25,20-22
  79-92,65-93
  95-99,27-94
  23-88,23-88
  82-83,83-96
  2-94,2-74
  14-71,6-14
  6-14,5-7
  3-89,1-2
  48-82,13-26
  48-80,26-48
  43-93,92-92
  32-51,85-91
  3-5,5-90
  99-99,95-97
  38-39,38-88
  93-95,75-94
  15-64,14-16
  84-94,67-90
  22-47,48-80
  41-56,5-57
  2-80,7-79
  22-71,21-23
  21-49,20-22
  95-95,61-95
  56-57,57-58
  25-27,26-62
  52-76,41-61
  28-98,71-98
  74-93,4-93
  35-74,73-98
  4-57,3-57
  4-99,32-98
  8-75,7-75
  23-67,23-68
  15-15,15-56
  3-97,1-98
  10-90,91-91
  18-30,17-19
  10-38,1-90
  50-73,37-73
  40-91,92-95
  39-39,40-91
  86-87,7-87
  12-37,37-94
  78-87,14-50
  89-95,11-90
  60-98,4-94
  41-82,81-98
  66-92,67-67
  88-92,5-89
  86-91,85-86
  6-98,97-97
  34-87,95-95
  44-46,45-78
  7-87,17-87
  7-96,95-97
  15-75,76-85
  1-98,2-93
  3-55,50-54
  87-94,72-86
  19-70,19-63
  7-51,50-79
  3-73,3-73
  32-38,31-34
  2-99,98-98
  3-4,5-88
  16-37,38-38
  39-48,40-42
  65-77,65-77
  5-94,3-96
  28-89,97-98
  34-77,53-77
  24-54,25-28
  6-48,7-7
  6-38,3-6
  10-83,9-11
  26-65,64-84
  50-85,84-86
  36-91,37-92
  2-2,2-84
  4-6,5-83
  18-71,35-70
  5-85,5-64
  94-99,13-95
  1-32,2-9
  11-71,53-98
  99-99,18-97
  26-46,22-27
  39-78,91-93
  38-43,38-44
  14-76,15-54
  91-95,23-90
  7-55,3-55
  91-95,29-92
  10-23,9-59
  21-67,20-66
  17-27,20-26
  2-94,1-94
  16-97,13-97
  67-68,67-94
  81-83,27-82
  51-69,81-96
  79-81,57-80
  55-55,55-68
  34-96,34-95
  83-85,19-84
  4-81,3-80
  16-23,23-97
  45-74,46-74
  2-98,98-99
  37-59,35-59
  72-74,70-74
  16-91,91-92
  43-68,44-75
  4-77,7-92
  93-94,6-94
  18-92,93-94
  51-76,76-76
  17-42,41-79
  61-62,49-61
  19-77,9-9
  11-70,43-69
  21-62,53-61
  40-77,78-89
  10-55,10-46
  5-70,98-99
  19-21,20-86
  7-68,10-67
  2-24,3-3
  65-70,46-66
  1-78,2-77
  71-95,17-72
  25-88,88-89
  13-98,14-14
  7-81,7-8
  8-99,8-98
  13-97,14-97
  3-56,3-4
  89-99,29-73
  41-50,28-51
  76-88,76-87
  82-96,25-31
  30-41,8-42
  27-39,38-38
  46-71,46-71
  23-88,10-88
  28-83,28-84
  82-94,81-86
  99-99,1-99
  4-46,4-63
  7-68,67-99
  5-92,93-97
  91-95,3-89
  57-76,3-70
  1-89,53-88
  4-32,6-31
  75-76,2-76
  17-17,18-37
  43-90,89-94
  4-65,1-66
  88-91,90-91
  43-57,44-84
  2-95,2-94
  3-31,1-32
  12-94,30-93
  12-94,5-94
  35-54,34-54
  30-81,30-30
  51-53,52-98
  68-97,41-69
  32-94,19-31
  14-70,7-15
  1-99,41-98
  41-63,41-63
  88-88,27-87
  54-56,53-55
  26-26,27-71
  29-64,1-62
  4-54,1-92
  88-89,22-89
  15-88,15-16
  21-95,43-96
  12-13,12-27
  10-96,23-96
  82-83,22-83
  13-85,13-86
  77-83,4-65
  3-91,3-63
  73-98,73-98
  49-49,8-50
  3-96,4-4`
}

describe('day04', () => {
  describe('createAssignmentType', () => {
    it('gets an empty assignment chunk and returns an empty assignment', () => {
      const result: AssignmentType = createAssignmentType('')
      expect(result).toStrictEqual({startSection: undefined, endSection: undefined})
    })

    it('gets an assignment chunk with single digits and returns the assignment with single digit ranges', () => {
      const result: AssignmentType = createAssignmentType('2-4')
      expect(result).toStrictEqual({startSection: 2, endSection: 4})
    })

    it('gets an assignment chunk with multiple digits and returns the assignment with multiple digit ranges', () => {
      const result: AssignmentType = createAssignmentType('22-444')
      expect(result).toStrictEqual({startSection: 22, endSection: 444})
    })
  })

  describe('createAssignmentPairType', () => {
    it('gets an empty assignment pair chunk and returns an empty assignment pair', () => {
      const result: AssignmentPairType = createAssignmentPairType('')
      const expected: AssignmentPairType = {
        first: undefined,
        second: undefined
      }
      expect(result).toStrictEqual(expected)
    })

    it('gets an partial assignment pair chunk with single digits and returns a partial assignment pair with single digit ranges', () => {
      const result: AssignmentPairType = createAssignmentPairType('2-4,')
      const expected: AssignmentPairType = {
        first: {startSection: 2, endSection: 4},
        second: {startSection: undefined, endSection: undefined}
      }
      expect(result).toStrictEqual(expected)
    })

    it('gets an assignment pair chunk with single digits and returns the assignment pair with single digit ranges', () => {
      const result: AssignmentPairType = createAssignmentPairType('2-4,4-9')
      const expected: AssignmentPairType = {
        first: {startSection: 2, endSection: 4},
        second: {startSection: 4, endSection: 9}
      }
      expect(result).toStrictEqual(expected)
    })

    it('gets an assignment pair chunk with multiple digits and returns the assignment pair with multiple digit ranges', () => {
      const result: AssignmentPairType = createAssignmentPairType('22-44,44-999')
      const expected: AssignmentPairType = {
        first: {startSection: 22, endSection: 44},
        second: {startSection: 44, endSection: 999}
      }
      expect(result).toStrictEqual(expected)
    })
  })

  describe('isContainingOtherAssignmentFully', () => {
    it('gets an empty assignment pair and returns false', () => {
      const input: AssignmentPairType = {
        first: undefined,
        second: undefined
      }
      expect(isContainingOtherAssignmentFully(input)).toBeFalsy()
    })

    it('gets a partial assignment pair and returns false', () => {
      const input: AssignmentPairType = {
        first: {startSection: 2, endSection: 4},
        second: {startSection: undefined, endSection: undefined}
      }
      expect(isContainingOtherAssignmentFully(input)).toBeFalsy()
    })

    it('gets an overlapping assignment pair and returns false', () => {
      const input: AssignmentPairType = {
        first: {startSection: 2, endSection: 4},
        second: {startSection: 4, endSection: 8}
      }
      expect(isContainingOtherAssignmentFully(input)).toBeFalsy()
    })

    const testDataFirstFullyContainedInSecond = [
      {startSection: 4, endSection: 4},
      {startSection: 4, endSection: 6},
      {startSection: 4, endSection: 8},
      {startSection: 8, endSection: 8},
      {startSection: 7, endSection: 8},
      {startSection: 5, endSection: 7},
      {startSection: 7, endSection: 7},
    ]
    it.each(testDataFirstFullyContainedInSecond)('gets an assignment pair where the first ($startSection-$endSection) is fully contained in the second and returns true', ({startSection, endSection}) => {
      const input: AssignmentPairType = {
        first: {startSection, endSection},
        second: {startSection: 4, endSection: 8}
      }
      expect(isContainingOtherAssignmentFully(input)).toBeTruthy()
    })

    const testDataSecondFullyContainedInFirst = [
      {startSection: 4, endSection: 4},
      {startSection: 4, endSection: 6},
      {startSection: 4, endSection: 8},
      {startSection: 8, endSection: 8},
      {startSection: 7, endSection: 8},
      {startSection: 5, endSection: 7},
      {startSection: 7, endSection: 7},
    ]
    it.each(testDataSecondFullyContainedInFirst)('gets an assignment pair where the second ($startSection-$endSection) is fully contained in the first and returns true', ({startSection, endSection}) => {
      const input: AssignmentPairType = {
        first: {startSection: 4, endSection: 8},
        second: {startSection, endSection}
      }
      expect(isContainingOtherAssignmentFully(input)).toBeTruthy()
    })
  })

  describe('parseAssignmentPairs', () => {
    it('gets an empty list and returns no assignment pairs', () => {
      const input = ``
      const result: AssignmentPairType[] = parseAssignmentPairs(input)
      const expected: AssignmentPairType[] = []
      expect(result).toStrictEqual(expected)
    })

    it('gets a list with an assignment pair and returns one assignment pair', () => {
      const input = `2-4,6-8`
      const result: AssignmentPairType[] = parseAssignmentPairs(input)
      const expected: AssignmentPairType[] = [
        {
          first: {startSection: 2, endSection: 4},
          second: {startSection: 6, endSection: 8}
        },
      ]
      expect(result).toStrictEqual(expected)
    })

    it('gets a list with six assignment pairs and returns six assignment pairs', () => {
      const input = `2-4,6-8
      2-3,4-5
      5-7,7-9
      2-8,3-7
      6-6,4-6
      2-6,4-8`
      const result: AssignmentPairType[] = parseAssignmentPairs(input)
      const expected: AssignmentPairType[] = [
        {
          first: {startSection: 2, endSection: 4},
          second: {startSection: 6, endSection: 8}
        },
        {
          first: {startSection: 2, endSection: 3},
          second: {startSection: 4, endSection: 5}
        },
        {
          first: {startSection: 5, endSection: 7},
          second: {startSection: 7, endSection: 9}
        },
        {
          first: {startSection: 2, endSection: 8},
          second: {startSection: 3, endSection: 7}
        },
        {
          first: {startSection: 6, endSection: 6},
          second: {startSection: 4, endSection: 6}
        },
        {
          first: {startSection: 2, endSection: 6},
          second: {startSection: 4, endSection: 8}
        },
      ]
      expect(result).toStrictEqual(expected)
    })
  })

  describe('countFullyContainedAssignmentPairs', () => {
    it('gets an empty list of assignment pairs and returns 0', () => {
      const input: AssignmentPairType[] = []
      expect(countFullyContainedAssignmentPairs(input)).toBe(0)
    })

    it('gets a list with a non-overlapping assignment pair and returns 0', () => {
      const input: AssignmentPairType[] = [
        {
          first: {startSection: 2, endSection: 4},
          second: {startSection: 6, endSection: 8}
        },
      ]
      expect(countFullyContainedAssignmentPairs(input)).toBe(0)
    })

    it('gets a list with one overlapping assignment pair and returns 1', () => {
      const input: AssignmentPairType[] = [
        {
          first: {startSection: 4, endSection: 4},
          second: {startSection: 4, endSection: 8}
        },
      ]
      expect(countFullyContainedAssignmentPairs(input)).toBe(1)
    })

    it('gets a list with six assignment pairs where two are overlapping and returns 2', () => {
      const input: AssignmentPairType[] = [
        {
          first: {startSection: 2, endSection: 4},
          second: {startSection: 6, endSection: 8}
        },
        {
          first: {startSection: 2, endSection: 3},
          second: {startSection: 4, endSection: 5}
        },
        {
          first: {startSection: 5, endSection: 7},
          second: {startSection: 7, endSection: 9}
        },
        {
          first: {startSection: 2, endSection: 8},
          second: {startSection: 3, endSection: 7}
        },
        {
          first: {startSection: 6, endSection: 6},
          second: {startSection: 4, endSection: 6}
        },
        {
          first: {startSection: 2, endSection: 6},
          second: {startSection: 4, endSection: 8}
        },
      ]
      expect(countFullyContainedAssignmentPairs(input)).toBe(2)
    })
  })

  describe('solves puzzle #1', () => {
    it('gets the assignment pairs as input and returns the number of pairs fully containing one of the other', () => {
      const solution: number = countFullyContainedAssignmentPairs(parseAssignmentPairs(aoc.puzzleInput))
      console.log('puzzle #1 answer: ', solution)
      expect(solution).toBe(494)
    })
  })


  describe('isOverlappingOtherAssignment', () => {
    it('gets an empty assignment pair and returns false', () => {
      const input: AssignmentPairType = {
        first: undefined,
        second: undefined
      }
      expect(isOverlappingOtherAssignment(input)).toBeFalsy()
    })

    it('gets a partial assignment pair and returns false', () => {
      const input: AssignmentPairType = {
        first: {startSection: 2, endSection: 4},
        second: {startSection: undefined, endSection: undefined}
      }
      expect(isOverlappingOtherAssignment(input)).toBeFalsy()
    })

    const testDataFirstOverlapsSecond = [
      {startSection: 2, endSection: 4},
      {startSection: 4, endSection: 4},
      {startSection: 4, endSection: 6},
      {startSection: 4, endSection: 8},
      {startSection: 8, endSection: 8},
      {startSection: 7, endSection: 8},
      {startSection: 5, endSection: 7},
      {startSection: 7, endSection: 7},
    ]
    it.each(testDataFirstOverlapsSecond)('gets an assignment pair where the first ($startSection-$endSection) is overlapping the second and returns true', ({startSection, endSection}) => {
      const input: AssignmentPairType = {
        first: {startSection, endSection},
        second: {startSection: 4, endSection: 8}
      }
      expect(isOverlappingOtherAssignment(input)).toBeTruthy()
    })

    const testDataSecondOverlapsFirst = [
      {startSection: 4, endSection: 4},
      {startSection: 4, endSection: 6},
      {startSection: 4, endSection: 8},
      {startSection: 8, endSection: 8},
      {startSection: 7, endSection: 8},
      {startSection: 5, endSection: 7},
      {startSection: 7, endSection: 7},
      {startSection: 8, endSection: 12},
    ]
    it.each(testDataSecondOverlapsFirst)('gets an assignment pair where the second ($startSection-$endSection) is overlapping the first and returns true', ({startSection, endSection}) => {
      const input: AssignmentPairType = {
        first: {startSection: 4, endSection: 8},
        second: {startSection, endSection}
      }
      expect(isOverlappingOtherAssignment(input)).toBeTruthy()
    })
  })
})
