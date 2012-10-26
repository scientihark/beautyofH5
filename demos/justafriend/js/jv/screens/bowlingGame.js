define(['underscore', 'bumpslide/view', 'jv/media', 'bumpslide/canvasUtil', './progressClock', 'jv/tracker'], function (_, view, media, canvasUtil, progressClock, tracker) {

    return function () {

        var TARGET = [{left:-508, top:-2, w:2, h:1, x:348, y:178},{left:-505, top:-23, w:4, h:3, x:351, y:183},{left:-494, top:-23, w:9, h:4, x:355, y:187},{left:-458, top:-39, w:18, h:8, x:359, y:188},{left:-461, top:-23, w:31, h:14, x:365, y:188},{left:-461, top:-2, w:45, h:19, x:374, y:189},{left:-453, top:-60, w:53, h:22, x:387, y:191},{left:-195, top:-176, w:58, h:25, x:401, y:194},{left:-2, top:-291, w:59, h:25, x:414, y:198},{left:-2, top:-264, w:59, h:25, x:414, y:198},{left:-125, top:-289, w:60, h:25, x:427, y:203},{left:-63, top:-289, w:60, h:26, x:440, y:208},{left:-438, top:-289, w:60, h:26, x:452, y:213},{left:-374, top:-205, w:60, h:27, x:461, y:213},{left:-376, top:-289, w:60, h:26, x:465, y:210},{left:-255, top:-175, w:61, h:27, x:467, y:205},{left:-192, top:-147, w:61, h:27, x:470, y:199},{left:-129, top:-147, w:61, h:27, x:474, y:196},{left:-2, top:-148, w:61, h:27, x:477, y:196},{left:-66, top:-147, w:61, h:27, x:477, y:196},{left:-447, top:-147, w:61, h:27, x:473, y:197},{left:-384, top:-147, w:61, h:27, x:466, y:201},{left:-312, top:-205, w:60, h:27, x:461, y:203},{left:-250, top:-204, w:60, h:27, x:456, y:204},{left:-188, top:-204, w:60, h:27, x:449, y:207},{left:-126, top:-204, w:60, h:27, x:443, y:210},{left:-314, top:-262, w:60, h:26, x:437, y:210},{left:-2, top:-206, w:60, h:27, x:428, y:204},{left:-2, top:-235, w:59, h:27, x:419, y:196},{left:-451, top:-89, w:59, h:27, x:419, y:196},{left:-64, top:-204, w:60, h:27, x:413, y:189},{left:-442, top:-176, w:60, h:27, x:413, y:187},{left:-252, top:-262, w:60, h:26, x:418, y:190},{left:-380, top:-176, w:60, h:27, x:425, y:194},{left:-318, top:-176, w:60, h:27, x:435, y:196},{left:-2, top:-177, w:60, h:27, x:449, y:197},{left:-450, top:-118, w:60, h:27, x:463, y:196},{left:-321, top:-147, w:61, h:27, x:474, y:195},{left:-189, top:-261, w:61, h:26, x:481, y:192},{left:-126, top:-261, w:61, h:26, x:481, y:192},{left:-387, top:-118, w:61, h:27, x:486, y:185},{left:-258, top:-146, w:61, h:27, x:489, y:176},{left:-194, top:-118, w:62, h:27, x:493, y:169},{left:-63, top:-261, w:61, h:26, x:500, y:168},{left:-130, top:-118, w:62, h:27, x:507, y:170},{left:-2, top:-119, w:62, h:27, x:511, y:173},{left:-66, top:-118, w:62, h:27, x:510, y:173},{left:-387, top:-89, w:62, h:27, x:509, y:173},{left:-132, top:-60, w:63, h:27, x:506, y:176},{left:-2, top:-61, w:63, h:27, x:506, y:176},{left:-130, top:-176, w:63, h:26, x:500, y:181},{left:-323, top:-89, w:62, h:27, x:492, y:185},{left:-259, top:-89, w:62, h:27, x:482, y:191},{left:-320, top:-234, w:62, h:26, x:474, y:199},{left:-256, top:-234, w:62, h:26, x:466, y:205},{left:-195, top:-89, w:62, h:27, x:455, y:209},{left:-447, top:-261, w:61, h:26, x:446, y:218},{left:-192, top:-233, w:62, h:26, x:437, y:231},{left:-131, top:-89, w:62, h:27, x:426, y:239},{left:-2, top:-90, w:62, h:27, x:426, y:239},{left:-67, top:-89, w:62, h:27, x:415, y:239},{left:-384, top:-261, w:61, h:26, x:410, y:237},{left:-324, top:-118, w:61, h:27, x:408, y:237},{left:-128, top:-233, w:62, h:26, x:408, y:240},{left:-64, top:-233, w:62, h:26, x:409, y:240},{left:-389, top:-60, w:62, h:27, x:411, y:235},{left:-436, top:-233, w:62, h:26, x:413, y:230},{left:-325, top:-60, w:62, h:27, x:418, y:227},{left:-67, top:-60, w:63, h:27, x:427, y:229},{left:-393, top:-31, w:63, h:27, x:427, y:229},{left:-436, top:-205, w:62, h:26, x:438, y:234},{left:-261, top:-60, w:62, h:27, x:448, y:239},{left:-197, top:-60, w:62, h:27, x:458, y:244},{left:-328, top:-31, w:63, h:27, x:469, y:247},{left:-263, top:-31, w:63, h:27, x:481, y:248},{left:-258, top:-118, w:64, h:26, x:491, y:250},{left:-65, top:-176, w:63, h:26, x:498, y:252},{left:-200, top:-2, w:64, h:27, x:501, y:253},{left:-198, top:-31, w:63, h:27, x:503, y:252},{left:-133, top:-31, w:63, h:27, x:503, y:252},{left:-2, top:-32, w:63, h:27, x:502, y:250},{left:-134, top:-2, w:64, h:27, x:498, y:248},{left:-68, top:-2, w:64, h:27, x:492, y:247},{left:-2, top:-2, w:64, h:28, x:482, y:245},{left:-68, top:-31, w:63, h:27, x:469, y:242},{left:-396, top:-2, w:63, h:27, x:454, y:237},{left:-331, top:-2, w:63, h:27, x:438, y:231},{left:-266, top:-2, w:63, h:27, x:421, y:224}];

        var ARROW_COORDS = [[{left:-42, top:-314, w:39, h:18, x:327, y:165},{left:-83, top:-295, w:39, h:18, x:327, y:171},{left:-204, top:-255, w:39, h:18, x:327, y:175},{left:-42, top:-294, w:39, h:18, x:328, y:178},{left:-124, top:-293, w:38, h:18, x:331, y:181},{left:-83, top:-275, w:39, h:18, x:336, y:184},{left:-164, top:-274, w:38, h:18, x:343, y:188},{left:-2, top:-295, w:38, h:18, x:347, y:192},{left:-42, top:-274, w:39, h:18, x:349, y:195},{left:-83, top:-255, w:39, h:18, x:349, y:195},{left:-42, top:-254, w:39, h:18, x:351, y:199},{left:-2, top:-275, w:38, h:18, x:355, y:204},{left:-83, top:-235, w:39, h:18, x:358, y:207},{left:-124, top:-273, w:38, h:18, x:360, y:206},{left:-43, top:-213, w:39, h:19, x:359, y:202},{left:-2, top:-213, w:39, h:19, x:360, y:196},{left:-2, top:-255, w:38, h:18, x:365, y:191},{left:-164, top:-254, w:38, h:18, x:374, y:188},{left:-2, top:-234, w:38, h:19, x:384, y:187},{left:-204, top:-234, w:38, h:19, x:384, y:187},{left:-124, top:-253, w:38, h:18, x:390, y:190},{left:-164, top:-233, w:38, h:19, x:394, y:194},{left:-42, top:-234, w:39, h:18, x:401, y:197},{left:-207, top:-192, w:39, h:19, x:408, y:199},{left:-166, top:-191, w:39, h:19, x:414, y:203},{left:-84, top:-193, w:39, h:19, x:420, y:207},{left:-125, top:-191, w:39, h:19, x:425, y:208},{left:-43, top:-192, w:39, h:19, x:426, y:203},{left:-207, top:-213, w:38, h:19, x:424, y:196},{left:-124, top:-232, w:38, h:19, x:424, y:196},{left:-84, top:-214, w:38, h:19, x:423, y:189},{left:-167, top:-212, w:38, h:19, x:425, y:187},{left:-88, top:-24, w:38, h:20, x:428, y:189},{left:-2, top:-192, w:39, h:19, x:430, y:193},{left:-207, top:-171, w:39, h:19, x:434, y:195},{left:-166, top:-170, w:39, h:19, x:439, y:195},{left:-84, top:-172, w:39, h:19, x:443, y:194},{left:-125, top:-170, w:39, h:19, x:443, y:192},{left:-43, top:-171, w:39, h:19, x:439, y:189},{left:-2, top:-171, w:39, h:19, x:439, y:189},{left:-84, top:-151, w:39, h:19, x:432, y:182},{left:-43, top:-150, w:39, h:19, x:423, y:173},{left:-2, top:-150, w:39, h:19, x:415, y:166},{left:-209, top:-150, w:39, h:19, x:412, y:164},{left:-168, top:-149, w:39, h:19, x:410, y:166},{left:-127, top:-149, w:39, h:19, x:407, y:168},{left:-44, top:-129, w:40, h:19, x:401, y:168},{left:-2, top:-129, w:40, h:19, x:398, y:169},{left:-212, top:-108, w:40, h:19, x:397, y:172},{left:-170, top:-107, w:40, h:19, x:397, y:172},{left:-86, top:-109, w:40, h:19, x:396, y:177},{left:-128, top:-107, w:40, h:19, x:395, y:182},{left:-44, top:-108, w:40, h:19, x:395, y:189},{left:-2, top:-108, w:40, h:19, x:399, y:196},{left:-212, top:-87, w:40, h:19, x:403, y:202},{left:-210, top:-129, w:39, h:19, x:406, y:208},{left:-170, top:-86, w:40, h:19, x:409, y:216},{left:-169, top:-128, w:39, h:19, x:414, y:229},{left:-86, top:-2, w:40, h:20, x:414, y:238},{left:-44, top:-2, w:40, h:20, x:414, y:238},{left:-86, top:-88, w:40, h:19, x:413, y:239},{left:-214, top:-2, w:39, h:20, x:415, y:236},{left:-86, top:-130, w:39, h:19, x:418, y:237},{left:-128, top:-128, w:39, h:19, x:420, y:240},{left:-128, top:-86, w:40, h:19, x:419, y:239},{left:-44, top:-87, w:40, h:19, x:416, y:235},{left:-2, top:-87, w:40, h:19, x:412, y:230},{left:-212, top:-66, w:40, h:19, x:408, y:227},{left:-170, top:-65, w:40, h:19, x:407, y:229},{left:-86, top:-67, w:40, h:19, x:407, y:229},{left:-128, top:-65, w:40, h:19, x:406, y:233},{left:-44, top:-66, w:40, h:19, x:404, y:238},{left:-2, top:-66, w:40, h:19, x:402, y:243},{left:-212, top:-45, w:40, h:19, x:401, y:246},{left:-125, top:-212, w:40, h:18, x:401, y:247},{left:-170, top:-44, w:40, h:19, x:401, y:248},{left:-86, top:-46, w:40, h:19, x:399, y:249},{left:-128, top:-44, w:40, h:19, x:395, y:250},{left:-45, top:-24, w:41, h:19, x:391, y:249},{left:-2, top:-24, w:41, h:19, x:391, y:249},{left:-171, top:-23, w:41, h:19, x:388, y:247},{left:-128, top:-23, w:41, h:19, x:386, y:245},{left:-44, top:-45, w:40, h:19, x:386, y:244},{left:-2, top:-2, w:40, h:20, x:384, y:242},{left:-171, top:-2, w:41, h:19, x:380, y:239},{left:-2, top:-45, w:40, h:19, x:377, y:234},{left:-128, top:-2, w:41, h:19, x:374, y:228},{left:-214, top:-24, w:40, h:19, x:371, y:222}]    ,
        		[{left:-166, top:-295, w:39, h:18, x:350, y:165},{left:-125, top:-276, w:39, h:18, x:350, y:171},{left:-43, top:-297, w:38, h:18, x:350, y:176},{left:-2, top:-280, w:39, h:18, x:350, y:179},{left:-43, top:-277, w:39, h:18, x:353, y:182},{left:-84, top:-276, w:39, h:18, x:359, y:185},{left:-207, top:-275, w:39, h:18, x:365, y:189},{left:-166, top:-275, w:39, h:18, x:369, y:193},{left:-84, top:-296, w:38, h:18, x:372, y:196},{left:-207, top:-295, w:38, h:18, x:372, y:196},{left:-127, top:-109, w:38, h:18, x:374, y:200},{left:-207, top:-255, w:39, h:18, x:377, y:205},{left:-216, top:-45, w:38, h:19, x:381, y:208},{left:-166, top:-255, w:39, h:18, x:382, y:208},{left:-84, top:-256, w:39, h:18, x:381, y:204},{left:-216, top:-24, w:38, h:19, x:383, y:198},{left:-2, top:-259, w:39, h:19, x:387, y:193},{left:-43, top:-256, w:39, h:19, x:396, y:190},{left:-125, top:-255, w:39, h:19, x:406, y:189},{left:-207, top:-234, w:39, h:19, x:406, y:189},{left:-166, top:-234, w:39, h:19, x:412, y:192},{left:-84, top:-235, w:39, h:19, x:416, y:196},{left:-2, top:-238, w:39, h:19, x:423, y:199},{left:-43, top:-235, w:39, h:19, x:431, y:201},{left:-125, top:-234, w:39, h:19, x:437, y:205},{left:-209, top:-213, w:39, h:19, x:443, y:209},{left:-168, top:-213, w:39, h:19, x:448, y:210},{left:-84, top:-214, w:39, h:19, x:448, y:205},{left:-84, top:-87, w:39, h:20, x:446, y:197},{left:-2, top:-90, w:39, h:20, x:446, y:197},{left:-2, top:-217, w:39, h:19, x:445, y:191},{left:-43, top:-214, w:39, h:19, x:447, y:189},{left:-43, top:-87, w:39, h:20, x:450, y:191},{left:-129, top:-66, w:39, h:20, x:453, y:195},{left:-2, top:-24, w:40, h:20, x:456, y:197},{left:-2, top:-68, w:39, h:20, x:462, y:197},{left:-127, top:-213, w:39, h:19, x:466, y:196},{left:-211, top:-192, w:39, h:19, x:466, y:194},{left:-2, top:-196, w:39, h:19, x:462, y:190},{left:-2, top:-175, w:39, h:19, x:462, y:190},{left:-169, top:-192, w:40, h:19, x:454, y:183},{left:-85, top:-193, w:40, h:19, x:445, y:174},{left:-43, top:-193, w:40, h:19, x:438, y:167},{left:-2, top:-154, w:39, h:19, x:435, y:165},{left:-127, top:-192, w:40, h:19, x:433, y:167},{left:-2, top:-133, w:39, h:19, x:430, y:169},{left:-211, top:-171, w:40, h:19, x:424, y:169},{left:-2, top:-112, w:39, h:19, x:422, y:170},{left:-169, top:-171, w:40, h:19, x:420, y:173},{left:-85, top:-172, w:40, h:19, x:420, y:173},{left:-43, top:-172, w:40, h:19, x:419, y:178},{left:-127, top:-171, w:40, h:19, x:418, y:183},{left:-2, top:-46, w:39, h:20, x:419, y:189},{left:-211, top:-150, w:40, h:19, x:422, y:197},{left:-169, top:-150, w:40, h:19, x:426, y:203},{left:-85, top:-151, w:40, h:19, x:429, y:209},{left:-43, top:-151, w:40, h:19, x:433, y:217},{left:-213, top:-2, w:40, h:20, x:437, y:230},{left:-127, top:-150, w:40, h:19, x:437, y:240},{left:-211, top:-129, w:40, h:19, x:437, y:240},{left:-169, top:-129, w:40, h:19, x:436, y:240},{left:-85, top:-130, w:40, h:19, x:438, y:238},{left:-171, top:-2, w:40, h:20, x:441, y:238},{left:-43, top:-130, w:40, h:19, x:443, y:241},{left:-129, top:-2, w:40, h:20, x:442, y:240},{left:-127, top:-129, w:40, h:19, x:440, y:236},{left:-87, top:-2, w:40, h:20, x:435, y:230},{left:-45, top:-2, w:40, h:20, x:431, y:227},{left:-85, top:-109, w:40, h:19, x:430, y:229},{left:-43, top:-109, w:40, h:19, x:430, y:229},{left:-209, top:-108, w:40, h:19, x:429, y:234},{left:-86, top:-66, w:41, h:19, x:427, y:239},{left:-43, top:-66, w:41, h:19, x:425, y:244},{left:-173, top:-45, w:41, h:19, x:424, y:246},{left:-167, top:-108, w:40, h:19, x:425, y:247},{left:-130, top:-45, w:41, h:19, x:424, y:248},{left:-87, top:-45, w:41, h:19, x:422, y:250},{left:-44, top:-45, w:41, h:19, x:418, y:251},{left:-125, top:-88, w:40, h:19, x:415, y:250},{left:-212, top:-87, w:40, h:19, x:415, y:250},{left:-170, top:-87, w:40, h:19, x:412, y:248},{left:-173, top:-24, w:41, h:19, x:410, y:246},{left:-130, top:-24, w:41, h:19, x:409, y:245},{left:-2, top:-2, w:41, h:20, x:407, y:243},{left:-212, top:-66, w:40, h:19, x:404, y:240},{left:-87, top:-24, w:41, h:19, x:400, y:235},{left:-44, top:-24, w:41, h:19, x:398, y:229},{left:-170, top:-66, w:40, h:19, x:395, y:223}] ,
        		[{left:-166, top:-299, w:39, h:18, x:368, y:165},{left:-125, top:-299, w:39, h:18, x:368, y:171},{left:-84, top:-299, w:39, h:18, x:368, y:176},{left:-207, top:-279, w:39, h:19, x:369, y:179},{left:-2, top:-302, w:39, h:18, x:372, y:182},{left:-166, top:-278, w:39, h:19, x:377, y:185},{left:-43, top:-299, w:39, h:18, x:383, y:189},{left:-216, top:-88, w:38, h:18, x:388, y:193},{left:-84, top:-279, w:39, h:18, x:390, y:197},{left:-2, top:-282, w:39, h:18, x:390, y:197},{left:-43, top:-279, w:39, h:18, x:392, y:201},{left:-216, top:-68, w:38, h:18, x:396, y:206},{left:-125, top:-278, w:39, h:19, x:399, y:209},{left:-84, top:-258, w:39, h:19, x:400, y:209},{left:-2, top:-261, w:39, h:19, x:400, y:205},{left:-43, top:-258, w:39, h:19, x:401, y:199},{left:-209, top:-258, w:39, h:19, x:405, y:194},{left:-168, top:-257, w:39, h:19, x:415, y:191},{left:-85, top:-237, w:39, h:19, x:425, y:191},{left:-2, top:-240, w:39, h:19, x:425, y:191},{left:-85, top:-216, w:39, h:19, x:431, y:193},{left:-2, top:-68, w:40, h:20, x:434, y:197},{left:-2, top:-219, w:39, h:19, x:442, y:200},{left:-43, top:-152, w:39, h:20, x:449, y:202},{left:-85, top:-195, w:39, h:19, x:455, y:207},{left:-86, top:-131, w:39, h:20, x:461, y:210},{left:-2, top:-198, w:39, h:19, x:466, y:211},{left:-2, top:-134, w:39, h:20, x:467, y:206},{left:-85, top:-174, w:39, h:19, x:465, y:199},{left:-2, top:-177, w:39, h:19, x:465, y:199},{left:-215, top:-110, w:39, h:20, x:464, y:192},{left:-2, top:-112, w:39, h:20, x:466, y:190},{left:-2, top:-90, w:39, h:20, x:469, y:193},{left:-126, top:-257, w:40, h:19, x:471, y:197},{left:-43, top:-237, w:40, h:19, x:475, y:199},{left:-210, top:-237, w:40, h:19, x:480, y:199},{left:-212, top:-46, w:40, h:20, x:484, y:197},{left:-2, top:-156, w:39, h:19, x:485, y:195},{left:-168, top:-236, w:40, h:19, x:480, y:191},{left:-126, top:-236, w:40, h:19, x:480, y:191},{left:-43, top:-216, w:40, h:19, x:473, y:184},{left:-210, top:-216, w:40, h:19, x:464, y:175},{left:-168, top:-215, w:40, h:19, x:457, y:168},{left:-126, top:-215, w:40, h:19, x:453, y:166},{left:-43, top:-195, w:40, h:19, x:452, y:168},{left:-210, top:-195, w:40, h:19, x:449, y:170},{left:-168, top:-194, w:40, h:19, x:443, y:170},{left:-170, top:-46, w:40, h:20, x:440, y:170},{left:-126, top:-194, w:40, h:19, x:439, y:174},{left:-43, top:-174, w:40, h:19, x:439, y:174},{left:-210, top:-174, w:40, h:19, x:438, y:179},{left:-168, top:-173, w:40, h:19, x:437, y:184},{left:-126, top:-173, w:40, h:19, x:438, y:190},{left:-128, top:-46, w:40, h:20, x:441, y:197},{left:-211, top:-153, w:40, h:19, x:445, y:204},{left:-84, top:-153, w:40, h:19, x:448, y:209},{left:-169, top:-152, w:40, h:19, x:452, y:218},{left:-127, top:-152, w:40, h:19, x:456, y:231},{left:-86, top:-46, w:40, h:20, x:456, y:240},{left:-44, top:-46, w:40, h:20, x:456, y:240},{left:-211, top:-132, w:40, h:19, x:455, y:241},{left:-2, top:-46, w:40, h:20, x:457, y:238},{left:-214, top:-24, w:40, h:20, x:460, y:239},{left:-172, top:-24, w:40, h:20, x:462, y:241},{left:-43, top:-131, w:41, h:19, x:461, y:241},{left:-130, top:-24, w:40, h:20, x:459, y:236},{left:-172, top:-110, w:41, h:19, x:454, y:231},{left:-129, top:-110, w:41, h:19, x:450, y:228},{left:-86, top:-110, w:41, h:19, x:449, y:230},{left:-43, top:-110, w:41, h:19, x:449, y:230},{left:-173, top:-89, w:41, h:19, x:448, y:234},{left:-169, top:-131, w:40, h:19, x:447, y:239},{left:-130, top:-89, w:41, h:19, x:444, y:244},{left:-45, top:-24, w:41, h:20, x:443, y:246},{left:-2, top:-24, w:41, h:20, x:444, y:247},{left:-87, top:-89, w:41, h:19, x:444, y:249},{left:-174, top:-2, w:41, h:20, x:441, y:250},{left:-44, top:-89, w:41, h:19, x:437, y:251},{left:-131, top:-2, w:41, h:20, x:434, y:250},{left:-88, top:-2, w:41, h:20, x:434, y:250},{left:-173, top:-68, w:41, h:19, x:431, y:248},{left:-130, top:-68, w:41, h:19, x:429, y:246},{left:-88, top:-24, w:40, h:20, x:429, y:245},{left:-127, top:-131, w:40, h:19, x:427, y:244},{left:-45, top:-2, w:41, h:20, x:423, y:240},{left:-2, top:-2, w:41, h:20, x:420, y:235},{left:-87, top:-68, w:41, h:19, x:417, y:230},{left:-44, top:-68, w:41, h:19, x:414, y:224}] ,
        		[{left:-207, top:-299, w:39, h:18, x:386, y:165},{left:-166, top:-299, w:39, h:18, x:386, y:171},{left:-84, top:-300, w:39, h:18, x:386, y:176},{left:-2, top:-302, w:39, h:18, x:387, y:180},{left:-84, top:-279, w:39, h:19, x:390, y:182},{left:-43, top:-300, w:39, h:18, x:395, y:186},{left:-125, top:-299, w:39, h:18, x:401, y:189},{left:-216, top:-89, w:38, h:19, x:406, y:193},{left:-207, top:-279, w:39, h:18, x:408, y:197},{left:-166, top:-279, w:39, h:18, x:408, y:197},{left:-2, top:-281, w:39, h:19, x:410, y:201},{left:-216, top:-68, w:38, h:19, x:414, y:206},{left:-125, top:-279, w:39, h:18, x:417, y:210},{left:-43, top:-279, w:39, h:19, x:418, y:209},{left:-207, top:-258, w:39, h:19, x:418, y:206},{left:-166, top:-258, w:39, h:19, x:419, y:200},{left:-125, top:-258, w:39, h:19, x:423, y:195},{left:-84, top:-258, w:39, h:19, x:433, y:192},{left:-2, top:-260, w:39, h:19, x:443, y:192},{left:-43, top:-258, w:39, h:19, x:443, y:192},{left:-210, top:-237, w:39, h:19, x:449, y:194},{left:-2, top:-68, w:40, h:20, x:452, y:198},{left:-207, top:-110, w:39, h:20, x:460, y:201},{left:-169, top:-237, w:39, h:19, x:467, y:204},{left:-2, top:-239, w:39, h:19, x:473, y:208},{left:-127, top:-237, w:40, h:19, x:479, y:212},{left:-85, top:-237, w:40, h:19, x:484, y:212},{left:-166, top:-110, w:39, h:20, x:485, y:207},{left:-2, top:-218, w:39, h:19, x:483, y:200},{left:-2, top:-197, w:39, h:19, x:483, y:200},{left:-125, top:-110, w:39, h:20, x:482, y:193},{left:-84, top:-110, w:39, h:20, x:484, y:191},{left:-2, top:-112, w:39, h:20, x:487, y:194},{left:-213, top:-46, w:40, h:20, x:489, y:198},{left:-43, top:-237, w:40, h:19, x:493, y:200},{left:-211, top:-216, w:40, h:19, x:498, y:200},{left:-43, top:-110, w:39, h:20, x:503, y:198},{left:-169, top:-216, w:40, h:19, x:503, y:196},{left:-2, top:-176, w:39, h:19, x:499, y:192},{left:-2, top:-155, w:39, h:19, x:499, y:192},{left:-2, top:-90, w:39, h:20, x:492, y:184},{left:-2, top:-134, w:39, h:19, x:483, y:175},{left:-127, top:-216, w:40, h:19, x:475, y:168},{left:-85, top:-216, w:40, h:19, x:472, y:166},{left:-43, top:-216, w:40, h:19, x:470, y:168},{left:-171, top:-46, w:40, h:20, x:467, y:170},{left:-129, top:-46, w:40, h:20, x:462, y:170},{left:-211, top:-195, w:40, h:19, x:459, y:171},{left:-169, top:-195, w:40, h:19, x:458, y:174},{left:-127, top:-195, w:40, h:19, x:458, y:174},{left:-85, top:-195, w:40, h:19, x:457, y:179},{left:-43, top:-195, w:40, h:19, x:456, y:184},{left:-211, top:-174, w:40, h:19, x:456, y:190},{left:-169, top:-174, w:40, h:19, x:460, y:198},{left:-127, top:-174, w:40, h:19, x:464, y:204},{left:-173, top:-89, w:41, h:19, x:466, y:209},{left:-85, top:-174, w:40, h:19, x:470, y:218},{left:-2, top:-46, w:41, h:20, x:474, y:231},{left:-43, top:-174, w:40, h:19, x:475, y:241},{left:-211, top:-153, w:40, h:19, x:475, y:241},{left:-169, top:-153, w:40, h:19, x:474, y:241},{left:-127, top:-153, w:40, h:19, x:476, y:239},{left:-87, top:-46, w:40, h:20, x:479, y:239},{left:-85, top:-153, w:40, h:19, x:481, y:242},{left:-174, top:-24, w:41, h:20, x:480, y:241},{left:-43, top:-153, w:40, h:19, x:478, y:237},{left:-211, top:-132, w:40, h:19, x:473, y:231},{left:-130, top:-89, w:41, h:19, x:469, y:228},{left:-87, top:-89, w:41, h:19, x:468, y:230},{left:-44, top:-89, w:41, h:19, x:468, y:230},{left:-173, top:-68, w:41, h:19, x:467, y:234},{left:-169, top:-132, w:40, h:19, x:466, y:239},{left:-130, top:-68, w:41, h:19, x:463, y:244},{left:-131, top:-24, w:41, h:20, x:462, y:246},{left:-127, top:-132, w:40, h:19, x:463, y:247},{left:-85, top:-132, w:40, h:19, x:463, y:249},{left:-88, top:-24, w:41, h:20, x:460, y:250},{left:-45, top:-24, w:41, h:20, x:456, y:251},{left:-2, top:-24, w:41, h:20, x:453, y:250},{left:-174, top:-2, w:41, h:20, x:453, y:250},{left:-131, top:-2, w:41, h:20, x:450, y:248},{left:-88, top:-2, w:41, h:20, x:448, y:246},{left:-45, top:-46, w:40, h:20, x:448, y:245},{left:-43, top:-132, w:40, h:19, x:446, y:244},{left:-87, top:-68, w:41, h:19, x:442, y:241},{left:-44, top:-68, w:41, h:19, x:439, y:236},{left:-45, top:-2, w:41, h:20, x:436, y:230},{left:-2, top:-2, w:41, h:20, x:433, y:224}],
        		[{left:-84, top:-302, w:39, h:18, x:407, y:165},{left:-2, top:-306, w:39, h:18, x:407, y:172},{left:-43, top:-302, w:39, h:18, x:407, y:176},{left:-207, top:-302, w:39, h:18, x:408, y:180},{left:-216, top:-154, w:38, h:18, x:411, y:183},{left:-166, top:-301, w:39, h:18, x:416, y:186},{left:-125, top:-301, w:39, h:18, x:422, y:190},{left:-216, top:-134, w:38, h:18, x:427, y:194},{left:-207, top:-282, w:39, h:18, x:429, y:198},{left:-166, top:-281, w:39, h:18, x:429, y:198},{left:-125, top:-281, w:39, h:18, x:431, y:202},{left:-84, top:-281, w:39, h:19, x:434, y:207},{left:-2, top:-285, w:39, h:19, x:438, y:211},{left:-43, top:-281, w:39, h:19, x:439, y:211},{left:-211, top:-261, w:39, h:19, x:439, y:207},{left:-2, top:-264, w:39, h:19, x:440, y:202},{left:-2, top:-200, w:39, h:20, x:444, y:196},{left:-2, top:-134, w:40, h:20, x:453, y:193},{left:-212, top:-112, w:40, h:20, x:463, y:193},{left:-170, top:-112, w:40, h:20, x:463, y:193},{left:-169, top:-260, w:40, h:19, x:469, y:196},{left:-128, top:-112, w:40, h:20, x:473, y:200},{left:-2, top:-243, w:39, h:19, x:481, y:203},{left:-86, top:-112, w:40, h:20, x:488, y:205},{left:-215, top:-176, w:39, h:20, x:494, y:209},{left:-44, top:-112, w:40, h:20, x:500, y:213},{left:-2, top:-112, w:40, h:20, x:505, y:213},{left:-127, top:-260, w:40, h:19, x:506, y:209},{left:-2, top:-178, w:39, h:20, x:504, y:201},{left:-2, top:-156, w:39, h:20, x:504, y:201},{left:-2, top:-222, w:39, h:19, x:503, y:195},{left:-212, top:-90, w:40, h:20, x:505, y:193},{left:-170, top:-90, w:40, h:20, x:508, y:196},{left:-128, top:-90, w:40, h:20, x:510, y:200},{left:-86, top:-90, w:40, h:20, x:514, y:201},{left:-215, top:-46, w:39, h:20, x:520, y:201},{left:-44, top:-90, w:40, h:20, x:524, y:199},{left:-85, top:-260, w:40, h:19, x:524, y:197},{left:-43, top:-260, w:40, h:19, x:520, y:193},{left:-211, top:-240, w:40, h:19, x:520, y:193},{left:-2, top:-90, w:40, h:20, x:513, y:185},{left:-169, top:-239, w:40, h:19, x:504, y:176},{left:-127, top:-239, w:40, h:19, x:497, y:169},{left:-85, top:-239, w:40, h:19, x:493, y:167},{left:-43, top:-239, w:40, h:19, x:492, y:169},{left:-211, top:-219, w:40, h:19, x:489, y:171},{left:-169, top:-218, w:40, h:19, x:483, y:171},{left:-88, top:-46, w:41, h:20, x:480, y:171},{left:-212, top:-68, w:40, h:20, x:479, y:174},{left:-170, top:-68, w:40, h:20, x:479, y:174},{left:-128, top:-68, w:40, h:20, x:478, y:179},{left:-86, top:-68, w:40, h:20, x:477, y:184},{left:-127, top:-218, w:40, h:19, x:478, y:191},{left:-45, top:-46, w:41, h:20, x:481, y:198},{left:-85, top:-218, w:40, h:19, x:486, y:205},{left:-43, top:-218, w:40, h:19, x:488, y:210},{left:-44, top:-68, w:40, h:20, x:492, y:218},{left:-214, top:-198, w:40, h:19, x:496, y:232},{left:-2, top:-68, w:40, h:20, x:497, y:241},{left:-173, top:-46, w:40, h:20, x:497, y:241},{left:-129, top:-197, w:41, h:19, x:495, y:242},{left:-2, top:-46, w:41, h:20, x:497, y:239},{left:-174, top:-24, w:41, h:20, x:500, y:240},{left:-131, top:-24, w:41, h:20, x:502, y:242},{left:-86, top:-197, w:41, h:19, x:502, y:242},{left:-88, top:-24, w:41, h:20, x:499, y:237},{left:-131, top:-46, w:40, h:20, x:495, y:231},{left:-45, top:-24, w:41, h:20, x:491, y:228},{left:-43, top:-197, w:41, h:19, x:490, y:230},{left:-172, top:-176, w:41, h:19, x:490, y:230},{left:-129, top:-176, w:41, h:19, x:489, y:235},{left:-2, top:-24, w:41, h:20, x:487, y:239},{left:-174, top:-2, w:41, h:20, x:485, y:244},{left:-86, top:-176, w:41, h:19, x:484, y:247},{left:-131, top:-2, w:41, h:20, x:485, y:247},{left:-43, top:-176, w:41, h:19, x:485, y:249},{left:-173, top:-155, w:41, h:19, x:482, y:251},{left:-130, top:-155, w:41, h:19, x:478, y:252},{left:-87, top:-155, w:41, h:19, x:475, y:251},{left:-44, top:-155, w:41, h:19, x:475, y:251},{left:-173, top:-134, w:41, h:19, x:472, y:249},{left:-130, top:-134, w:41, h:19, x:470, y:247},{left:-172, top:-197, w:40, h:19, x:470, y:246},{left:-88, top:-2, w:41, h:20, x:468, y:244},{left:-45, top:-2, w:41, h:20, x:464, y:241},{left:-2, top:-2, w:41, h:20, x:461, y:236},{left:-87, top:-134, w:41, h:19, x:458, y:231},{left:-44, top:-134, w:41, h:19, x:455, y:225}],
        		[{left:-43, top:-306, w:39, h:19, x:426, y:165},{left:-125, top:-323, w:38, h:18, x:427, y:172},{left:-207, top:-305, w:39, h:18, x:426, y:177},{left:-84, top:-303, w:39, h:19, x:427, y:180},{left:-208, top:-284, w:39, h:19, x:430, y:183},{left:-2, top:-325, w:38, h:19, x:436, y:186},{left:-166, top:-303, w:39, h:18, x:442, y:190},{left:-167, top:-282, w:39, h:19, x:446, y:194},{left:-126, top:-282, w:39, h:19, x:448, y:198},{left:-2, top:-304, w:39, h:19, x:448, y:198},{left:-125, top:-303, w:39, h:18, x:450, y:203},{left:-43, top:-285, w:39, h:19, x:454, y:208},{left:-85, top:-282, w:39, h:19, x:457, y:212},{left:-209, top:-263, w:39, h:19, x:459, y:212},{left:-168, top:-261, w:39, h:19, x:458, y:208},{left:-170, top:-240, w:40, h:19, x:459, y:203},{left:-127, top:-261, w:39, h:19, x:464, y:198},{left:-2, top:-283, w:39, h:19, x:473, y:195},{left:-44, top:-264, w:39, h:19, x:483, y:195},{left:-86, top:-261, w:39, h:19, x:483, y:195},{left:-45, top:-200, w:39, h:20, x:489, y:197},{left:-212, top:-242, w:39, h:19, x:493, y:202},{left:-44, top:-156, w:40, h:20, x:500, y:204},{left:-215, top:-178, w:39, h:20, x:508, y:207},{left:-45, top:-178, w:39, h:20, x:514, y:211},{left:-45, top:-222, w:39, h:19, x:520, y:215},{left:-128, top:-240, w:40, h:19, x:525, y:215},{left:-215, top:-156, w:39, h:20, x:526, y:210},{left:-2, top:-262, w:40, h:19, x:523, y:203},{left:-44, top:-243, w:40, h:19, x:523, y:203},{left:-2, top:-156, w:40, h:20, x:522, y:196},{left:-212, top:-134, w:40, h:20, x:524, y:195},{left:-170, top:-134, w:40, h:20, x:528, y:198},{left:-128, top:-134, w:40, h:20, x:530, y:201},{left:-86, top:-134, w:40, h:20, x:534, y:203},{left:-44, top:-134, w:40, h:20, x:539, y:203},{left:-2, top:-134, w:40, h:20, x:544, y:201},{left:-212, top:-112, w:40, h:20, x:544, y:198},{left:-86, top:-240, w:40, h:19, x:540, y:194},{left:-212, top:-221, w:40, h:19, x:540, y:194},{left:-170, top:-112, w:40, h:20, x:533, y:186},{left:-170, top:-219, w:40, h:19, x:524, y:177},{left:-128, top:-112, w:40, h:20, x:517, y:169},{left:-86, top:-112, w:40, h:20, x:513, y:167},{left:-128, top:-219, w:40, h:19, x:512, y:170},{left:-2, top:-241, w:40, h:19, x:509, y:172},{left:-129, top:-198, w:41, h:19, x:503, y:172},{left:-44, top:-112, w:40, h:20, x:501, y:172},{left:-2, top:-90, w:41, h:20, x:499, y:175},{left:-174, top:-68, w:41, h:20, x:499, y:175},{left:-2, top:-220, w:41, h:19, x:498, y:180},{left:-86, top:-198, w:41, h:19, x:497, y:185},{left:-2, top:-112, w:40, h:20, x:498, y:191},{left:-86, top:-219, w:40, h:19, x:502, y:199},{left:-213, top:-90, w:40, h:20, x:506, y:205},{left:-131, top:-68, w:41, h:20, x:508, y:210},{left:-172, top:-177, w:41, h:19, x:512, y:219},{left:-129, top:-177, w:41, h:19, x:516, y:233},{left:-171, top:-90, w:40, h:20, x:517, y:242},{left:-129, top:-90, w:40, h:20, x:517, y:242},{left:-214, top:-200, w:40, h:19, x:516, y:243},{left:-88, top:-68, w:41, h:20, x:517, y:240},{left:-87, top:-90, w:40, h:20, x:521, y:241},{left:-45, top:-90, w:40, h:20, x:523, y:243},{left:-45, top:-68, w:41, h:20, x:522, y:242},{left:-172, top:-198, w:40, h:19, x:520, y:238},{left:-2, top:-68, w:41, h:20, x:515, y:232},{left:-2, top:-199, w:41, h:19, x:511, y:229},{left:-174, top:-46, w:41, h:20, x:510, y:230},{left:-131, top:-46, w:41, h:20, x:510, y:230},{left:-2, top:-178, w:41, h:19, x:509, y:235},{left:-86, top:-177, w:41, h:19, x:508, y:240},{left:-172, top:-156, w:41, h:19, x:506, y:245},{left:-129, top:-156, w:41, h:19, x:505, y:247},{left:-86, top:-156, w:41, h:19, x:505, y:248},{left:-88, top:-46, w:41, h:20, x:505, y:249},{left:-45, top:-46, w:41, h:20, x:503, y:251},{left:-2, top:-46, w:41, h:20, x:499, y:252},{left:-174, top:-24, w:41, h:20, x:496, y:251},{left:-131, top:-24, w:41, h:20, x:496, y:251},{left:-88, top:-24, w:41, h:20, x:493, y:249},{left:-45, top:-24, w:41, h:20, x:491, y:247},{left:-2, top:-24, w:41, h:20, x:490, y:246},{left:-175, top:-2, w:41, h:20, x:488, y:245},{left:-132, top:-2, w:41, h:20, x:485, y:242},{left:-2, top:-2, w:42, h:20, x:481, y:237},{left:-89, top:-2, w:41, h:20, x:479, y:231},{left:-46, top:-2, w:41, h:20, x:476, y:225}],
        		[{left:-166, top:-347, w:39, h:18, x:445, y:166},{left:-125, top:-328, w:39, h:18, x:445, y:173},{left:-84, top:-328, w:39, h:18, x:445, y:178},{left:-166, top:-326, w:39, h:19, x:446, y:181},{left:-125, top:-307, w:39, h:19, x:449, y:184},{left:-84, top:-307, w:39, h:19, x:454, y:187},{left:-2, top:-330, w:39, h:18, x:460, y:191},{left:-2, top:-309, w:39, h:19, x:465, y:195},{left:-43, top:-328, w:39, h:18, x:467, y:200},{left:-207, top:-327, w:39, h:18, x:467, y:200},{left:-43, top:-307, w:39, h:19, x:469, y:204},{left:-85, top:-286, w:40, h:19, x:472, y:209},{left:-209, top:-306, w:39, h:19, x:476, y:213},{left:-213, top:-242, w:39, h:20, x:477, y:213},{left:-168, top:-305, w:39, h:19, x:477, y:210},{left:-127, top:-286, w:39, h:19, x:478, y:205},{left:-43, top:-286, w:40, h:19, x:482, y:200},{left:-211, top:-285, w:40, h:19, x:491, y:197},{left:-2, top:-288, w:39, h:19, x:502, y:197},{left:-2, top:-267, w:39, h:19, x:502, y:197},{left:-86, top:-222, w:39, h:20, x:508, y:199},{left:-2, top:-246, w:39, h:19, x:512, y:204},{left:-44, top:-222, w:40, h:20, x:519, y:206},{left:-212, top:-199, w:40, h:20, x:526, y:209},{left:-128, top:-201, w:40, h:20, x:532, y:213},{left:-2, top:-224, w:39, h:20, x:539, y:216},{left:-169, top:-284, w:40, h:19, x:544, y:217},{left:-170, top:-199, w:40, h:20, x:544, y:212},{left:-127, top:-265, w:40, h:19, x:542, y:205},{left:-85, top:-265, w:40, h:19, x:542, y:205},{left:-86, top:-200, w:40, h:20, x:541, y:198},{left:-2, top:-202, w:40, h:20, x:543, y:197},{left:-87, top:-156, w:41, h:20, x:546, y:200},{left:-133, top:-24, w:40, h:21, x:549, y:203},{left:-44, top:-200, w:40, h:20, x:553, y:205},{left:-2, top:-2, w:41, h:21, x:558, y:204},{left:-2, top:-25, w:40, h:21, x:563, y:202},{left:-43, top:-265, w:40, h:19, x:563, y:200},{left:-128, top:-179, w:40, h:20, x:559, y:195},{left:-86, top:-178, w:40, h:20, x:559, y:195},{left:-211, top:-264, w:40, h:19, x:552, y:188},{left:-169, top:-263, w:40, h:19, x:543, y:178},{left:-2, top:-180, w:40, h:20, x:536, y:170},{left:-44, top:-156, w:41, h:20, x:532, y:168},{left:-127, top:-244, w:40, h:19, x:531, y:171},{left:-44, top:-178, w:40, h:20, x:528, y:173},{left:-85, top:-244, w:40, h:19, x:523, y:173},{left:-130, top:-157, w:40, h:20, x:520, y:173},{left:-2, top:-158, w:40, h:20, x:519, y:176},{left:-2, top:-136, w:40, h:20, x:519, y:176},{left:-2, top:-114, w:40, h:20, x:518, y:181},{left:-2, top:-92, w:40, h:20, x:517, y:186},{left:-173, top:-156, w:41, h:20, x:517, y:192},{left:-2, top:-70, w:40, h:20, x:521, y:200},{left:-130, top:-135, w:41, h:20, x:525, y:206},{left:-2, top:-48, w:40, h:20, x:528, y:211},{left:-87, top:-134, w:41, h:20, x:531, y:220},{left:-43, top:-244, w:40, h:19, x:536, y:234},{left:-44, top:-134, w:41, h:20, x:536, y:243},{left:-173, top:-134, w:41, h:20, x:536, y:243},{left:-130, top:-113, w:41, h:20, x:535, y:244},{left:-87, top:-112, w:41, h:20, x:537, y:241},{left:-44, top:-112, w:41, h:20, x:540, y:242},{left:-173, top:-112, w:41, h:20, x:542, y:244},{left:-170, top:-242, w:41, h:19, x:542, y:244},{left:-130, top:-91, w:41, h:20, x:539, y:239},{left:-87, top:-90, w:41, h:20, x:535, y:233},{left:-213, top:-221, w:41, h:19, x:531, y:230},{left:-44, top:-90, w:41, h:20, x:530, y:231},{left:-173, top:-90, w:41, h:20, x:530, y:231},{left:-127, top:-223, w:41, h:19, x:529, y:236},{left:-130, top:-69, w:41, h:20, x:528, y:240},{left:-87, top:-68, w:41, h:20, x:525, y:245},{left:-172, top:-178, w:42, h:19, x:524, y:248},{left:-44, top:-68, w:41, h:20, x:525, y:248},{left:-170, top:-221, w:41, h:19, x:525, y:250},{left:-173, top:-68, w:41, h:20, x:523, y:252},{left:-130, top:-47, w:41, h:20, x:519, y:253},{left:-89, top:-24, w:42, h:20, x:515, y:252},{left:-45, top:-24, w:42, h:20, x:515, y:252},{left:-177, top:-2, w:42, h:20, x:512, y:250},{left:-87, top:-46, w:41, h:20, x:511, y:248},{left:-44, top:-46, w:41, h:20, x:510, y:247},{left:-175, top:-46, w:41, h:20, x:508, y:246},{left:-133, top:-2, w:42, h:20, x:504, y:243},{left:-175, top:-24, w:41, h:20, x:501, y:238},{left:-89, top:-2, w:42, h:20, x:498, y:232},{left:-45, top:-2, w:42, h:20, x:495, y:227}]];

        var RESULT_STRIKE = "Strike";
        var RESULT_GUTTER = "Gutter";
        var RESULT_FEW = "Some Pins";

        var chances = [[0, 0.9, 0.1],[0, 0.3, 0.7],[0.3, 0, 0.7],[0.9, 0, 0.1],[0.3, 0, 0.7],[0, 0.3, 0.7],[0, 0.9, 0.1]];

        var OFFSET = -1;
        var FRAME_START = 65 + OFFSET; // What frame does the arrows starts
        var FRAME_END = 152 + OFFSET; // What frame does the arrows ends
        var FRAME_GAME_OVER = 142 + OFFSET; // When does it automatically bowl when the user don't touch anything
        var FRAME_REACT = 359 + OFFSET;

        var canvas, ctx, frame_canvas, frame_canvas_ctx;
        var target_img, target_canvas, target_ctx;
        var arrow_images=[], arrow_canvas, arrow_ctx;
        var cta_img, cta_canvas, cta_ctx;
        var _hasBowled = false;
        var _frame = 0;
        var _selectedArrow = 3;
        var _result=RESULT_GUTTER;
        var _reactMode = false;
        var _passive = true;

        var react_video_strike, react_video_few, react_video_left;
        var clock = progressClock();

        var self = view.extend({
            template:'<div class="scene HD" id="bowlingGame"></div>',
            name:'videoScene',
            onInit:onInit,
            onShow:onShow,
            onHide:onHide,
            draw: draw,
            pageName: "Bowling Game"
        });

        return self;

        function onInit() {

            canvas = canvasUtil.create( 960, 540 );
            ctx = canvas.getContext('2d');

            frame_canvas = canvasUtil.create(1,16);
            frame_canvas_ctx = frame_canvas.getContext('2d');

            target_canvas = canvasUtil.create(100,100);
            target_ctx = target_canvas.getContext('2d');

            arrow_canvas = canvasUtil.create(100,100);
            arrow_ctx = arrow_canvas.getContext('2d');

            // load arrow images
            for(var n=1; n<=7; n++) {
                arrow_images.push( media.getImage('img/arrow'+n+'.png') );
            }
            target_img = media.getImage('img/arrowhero.png');

            // create canvas for call to action sprite animation
            
            cta_img = media.getImage('img/push_and_bowl_cta.png');           
           
            cta_canvas = canvasUtil.create(257, 22);
            $(cta_canvas).css({top:540 - 60, left:(960 - cta_canvas.width) / 2 });
            
            cta_ctx = cta_canvas.getContext('2d');

            react_video_strike = media.getVideo('video/15_Bowl_React_C_10bit');
            react_video_few = media.getVideo('video/15_Bowl_React_B_10bit');
            react_video_left = media.getVideo('video/15_Bowl_React_D_10bit');

            clock.init();
        }

        function onShow() {
            _hasBowled = false;

            self.el.append(canvas);
            self.el.append(arrow_canvas);
            self.el.append(target_canvas);
            self.el.append(cta_canvas);
            self.el.append(clock.el.css({top:485, left:906}));

            target_ctx.width=1;
            target_ctx.width=1;
            ctx.clearRect(0,0,canvas.width, canvas.height);

            $(document).bind('keydown', onKeyDown);
            $(document).bind('MSPointerDown',onKeyDown);
            //$(video).show();
            _frame = 0;
            _hasBowled = false;
            _reactMode = false;
            _passive = true;

            try {
                react_video_strike.pause();
                react_video_strike.currentTime = .01;
            } catch (e) {

            }
            try {
                react_video_few.pause();
                react_video_few.currentTime = .01;
            } catch (e) {

            }
        }

        function onHide() {
            self.el.children().remove();
            $(document).unbind('keydown', onKeyDown);
            $(document).unbind('MSPointerDown', onKeyDown);
            //$(video).hide();
        }
                
        function onKeyDown(event) {
            if(event.which==32 || event.type === "MSPointerDown") {
                event.preventDefault();
                event.stopImmediatePropagation();
                if (_frame >= FRAME_START && _frame <= FRAME_GAME_OVER && !_hasBowled) {
                    // BOWL!
                    //console.log('HIT');
                    _passive = false;
                    bowl();
                }
            }
        }

        function draw(frame) {

            // store frame so we can check it in the keydown handler
            _frame = frame;

            // If the user hasn't bowled.
            if (frame > FRAME_GAME_OVER && !_hasBowled) bowl();

            // Draw target and selected arrow
            renderTarget();
            renderArrow();
            //renderCta( frame );

            var pct = (frame-FRAME_START) / (FRAME_GAME_OVER-FRAME_START);
            if(frame<FRAME_START || pct>1) {
                clock.hide();
            } else {
                clock.show();
                clock.setPercent( 1 - pct );
            }

            if(frame>=FRAME_REACT && !_reactMode) {
                _reactMode = true;

                if(_result==RESULT_FEW) {
                    playReactVid( react_video_few );
                } else if (_result==RESULT_STRIKE) {
                    playReactVid( react_video_strike);
                } else if (_selectedArrow<3) {
                    playReactVid( react_video_left );
                }
            }

        }

        function playReactVid(vid) {
            self.el.append(vid);
            try{
                vid.currentTime = .01;

            } catch(e){}
            vid.play();
        }


        function renderTarget() {

            if (_frame < FRAME_START || _frame > FRAME_END || _hasBowled) {
                // clear target canvas
                target_canvas.width = 1;
                target_canvas.height = 1;
                return;
            }

            // example pos: {left:0, top:0, w:0, h:0, x:0, y:0}
            var pos = TARGET[_frame - FRAME_START];

            // size sprite canvas to be just as big as we need it
            // setting size will clear it in the process
            target_canvas.width = pos.w;
            target_canvas.height = pos.h;

            // draw sprite frame onto canvas - pos data is meant to be used as CSS offset,
            // we must use negative numbers to determine src img loc
            target_ctx.drawImage(target_img, -pos.left, -pos.top, pos.w, pos.h, 0, 0, pos.w, pos.h);

            // position canvas
            $(target_canvas).css({left:pos.x, top:pos.y});
        }

        function renderArrow() {

            if(!_hasBowled || _frame < FRAME_START || _frame > FRAME_END) {
                arrow_canvas.width = 1;
                arrow_canvas.height = 1;
                return;
            }

            var pos = ARROW_COORDS[_selectedArrow][_frame-FRAME_START];
            arrow_canvas.width = pos.w;
            arrow_canvas.height = pos.h;
            arrow_ctx.drawImage(arrow_images[_selectedArrow], -pos.left, -pos.top, pos.w, pos.h, 0, 0, pos.w, pos.h);
            $(arrow_canvas).css({left:pos.x, top:pos.y});

        }

        function bowl() {
            _hasBowled = true;
            //_selectedArrow = 3;
            getClosestArrow(_frame - FRAME_START);

            var chance = chances[_selectedArrow];
            var oddStrike = chance[0];
            var oddGutter = chance[1];
            var oddFew = chance[2];

            var rand = Math.random();

            if (rand <= oddGutter) {
                _result = RESULT_GUTTER;
            } else if (rand > oddGutter && rand <= (oddGutter + oddFew)) {
                _result = RESULT_FEW;
            } else {
                _result = RESULT_STRIKE;
            }

            tracker.trackView( 'Bowling Game '+_result, _passive );

        //  console.log('RESULT:'+_result);


        }

        function getClosestArrow(frame_num) {

            var tpos = TARGET[frame_num];

            if(tpos==undefined) { _selectedArrow=0; return; }

        //  console.log('stopped on frame', frame_num, tpos);
            var tx = tpos.x + tpos.w/2;
            var min_dist = 999;
            var n=0;
            _.each( ARROW_COORDS, function (data) {
                var pos = data[frame_num];
                var x = pos.x + pos.w/2;
                var dist = Math.abs(tx-x);
                if(dist<min_dist) {
                    _selectedArrow = n;
                    min_dist = dist;
                }
                n++;
            })
        //  console.log('selected', _selectedArrow);
        }

        function renderCta(f) {
            var spriteFrames = 2;
            var endFrame = FRAME_END - 20;
            var easeFrames = 20;
            var easeInFrames = easeFrames * .5;

            var sprite_frame_idx = 2 + Math.floor(f / 5) % spriteFrames;

            cta_ctx.globalAlpha = 1.0;
            cta_ctx.clearRect(0, 0, cta_canvas.width, cta_canvas.height);

            // fade in/out
            if (f < easeInFrames) {
                cta_ctx.globalAlpha = ease(f / easeInFrames);
            } else if (f > (endFrame - easeFrames) && f < endFrame) {
                cta_ctx.globalAlpha = ease((endFrame - f) / easeFrames, 1 / 4);
            }

            if (f < endFrame) {
                cta_ctx.drawImage(cta_img, 0, sprite_frame_idx * cta_canvas.height, cta_canvas.width, cta_canvas.height, 0, 0, cta_canvas.width, cta_canvas.height);
            }
        }

        function ease(val, exp) {
            if (exp == null) exp = 4;
            if (val >= 1.0) return 1.0; // save processing for when we really need it
            if (val < 0) return 0;
            var eased = Math.max(0, Math.min(1.0, Math.abs(Math.pow(val, exp))));
            //console.log('eased: ' + eased);
            return eased;
        }

    };
});



