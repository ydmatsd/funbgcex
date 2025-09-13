const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const center = height/2;
const canvasWidth = 800;

BGClen = 43757;

geneList = [{locus_tag: "ATEG_09064 / 1...7175 (-)", protein_type: "nonribosomal peptide synthetase", start: 1, end: 7175, strand: "-", aaseq: "MFLRAWTVVLRYYVGSDMICFGQIDDTAKASPRFTLCHGDIAVNASLKELEPSFEISEHAQISQSAADWMNANTSFNTLVWKSSQPESFSAINDLDTTKSAIVLLVSNSPQPQATLLYAPHLIGDPVASAVAEAVGYVASVFLDAPETTIGEIDLFGHSSWEQIQQWNRTVPDMVEECLHEQIDKTALTCPDKIALECWDGSMTYAQLVDYTNRVGNFLIDQNIRPSVFVPCCFDKSLWAAISMLGVLKAGGAFVCIDPAQPIDRLTTIIEEVDANFVLAAPEHCKMFAGTGCTPLAIDADFIYSLPPCHGLPRRATPKDPLLAIFTSGSTGKPKGIIHEHRAVCSSAKEHAVRLNINSDTRTFQFASFTFIINTFELFTPLLKGGCACIPSKEDRLGRTAGAMRDFKANWVCLTPSFVRSVKPEDIPDVKTLLLAGEPVQQDNLEMWRSHVRLLNMYGASEASVCVTGELSGSVDRSTIGTGTGVATWIVDPTDDDRLAPIGAIGELVVEGPVLAREYINQPEKTAASFISNTSWLQRIRDGAPTRAYKTGDLARYGSDGRINLVGRKDMQVKLRGQRIELEEVEFHLRQTLPKGIELVVGLVKPVDQPDRPFLAAFVALKKSLDAGFHQVDDTSSQLLDEATRGWKDQAANSLPGYMVPSTLVKLKHMPLTASGKTNRKAVSDYASQLTVAALTGAKKKEHKEPATPTGIVLRKLWAQVLDLPPEAISADDSFLELGGNSIDAMKLVNIARDEAMGLSVGEIFGHPTLDDMAAASWKLDAQEFEDVPFSLLDESIDTNDLIEKVAAQCKVSASAIEDLYPCTALQDGLMALSDSRDGAYIAQHTLALGKDIDVNRFKRACQQVVDAHPILRTRIVFSTESTSLQAVVRGDIDWQVGEKLKDFLQSDKERPMRSGDSLTRYGLVHEGVEWTFVWTVHHAVYDAWTLELVFDRLHKAYHGEPMAKDVTFKEFMSYVVNTSANASEEYWRNYLAGATQNEFPCTVSTAKQPVSDATFGYEMSIKSADQQSGITLASMIRAAWGILIGSHSEADDVVFGTIVSGRNAPVSNLDRLVGPGIAAVPVRVKIPDNSTLTVRDFVKRVQSEATESIAYEQAGLQNIRRVSPEASSACDFQTLLVVQPAKEPVLTSETPNLRAVSGANANFGTYALTLECSLKSNGVACAAHYDSSLVDGDYIRRILGQLEHLLQQICTSTAETKLNELTFISAQDQANIRQWNQDIPSQVNETIHGLIANRFTERPKSQAVCAWDGSFTYAELDRHSARLARRLAELGAGPETFIPCCFEKSRWSVAAMLGVLRSGSAFLNIDPSQPESRIQLMIRKLKGQTIVCSPEQYDLCTRVAEGRNIVILNEDTPEESTSEVTPIAQVSPDNAAYVIFTSGSTGEPKGTIIQHGAYCSGSITHAPAMLMDGDTRALQFASFTFDASLVEILTVLVVGGCVCMPSEEQRKRDVTEAFRATRANWAVLTPSFVNLIKPEDVPSLKTLGLAGEAMSRSHIETWGHRVRLINAYGPSECCVCSTSNVDVTLESDPRNIGRACSGASWVVMPNNHHRLVPIGSVGELVMEGWNVGRGYLNEPTKTQAAFVENPRWLFPDDNTRPPVVYKTGDLVRYNPDGTLSFLRRKDTQVKLRGQRVELGEIEYRIKQSLASKPDAVVDILTPKDAPDQPRLVAFLPITMEDGMGSSNALDQLLPPPSEQHLAAVAGLDDLLAEFLPMHMIPSAYLPVQYIPKLPSGKADRKTLIRCGSQLTHRQMAEYSGAVVDVRPPTTEMQCTLQRLWADCLKLPTAQISLNDNFLRLGGDSITAMRLASAARAQGIPLSTATVFQHPTLEAMSAIAETLAEQKLPQSFEAFSSVKSIPKDQLLNEIVLPQAKVPASSVQDVVESTDFQTLAINGGLNQTRGWSNYLVFDFDGPIDLRRLQVACEKLIAHHAILRTVFVTTGSQLLQVVLQSYKPEFTFHIQDEQDPSERLVREDLARPPHLGEPIVRFMLIKDGAVRHRLIMRVSHAQYDGASMPLLLQDLRLAYRGETLPKRPNFSDFVRMQLHVNQGAEDFYTKLLTGSAMTQFVSHKKMSTTNVLNTMIADMVPLVAFKNHGITAATVIKAAWALVLGEMAATTDVVYGHMVSGRNLQLDNVEAIMGPCLNIVPVRANMGIMKTILDLLQTIQQQQTDTIPHESLGFRQIIDKCTDWPAETRFSSVFQYQEFGGEDASQPLSIERTLKCAPGFICPAPDACDLSILATPVGEQVRIEMIFSNHSMSRSFAEGTMRKLCSKVELISRGVEAQLPTVTEVRDIRPSIPLAEPLVNGNVNSMVKNVVNGINSRGMNGAHETNGVGDEQEPMEEVNLLASVRIN", aalen: "2373", color: "#005493", domain: "A-T-C-A-T-CT", homologue: "nonribosomal peptide synthetase ApmB (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00350.html' target='_blank'>FBGC00350</a>); identity: 69.6%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='https://www.ncbi.nlm.nih.gov/genome/annotation_prok/evidence/TIGR01733' target='_blank'>AA-adenyl-dom</a>, <a class='funbgcs' href='protfam.html#ACP_PCP' target='_blank'>ACP_PCP</a>, <a class='funbgcs' href='protfam.html#NRPS_C' target='_blank'>NRPS_C</a>, <a class='funbgcs' href='protfam.html#NRPS_CT' target='_blank'>NRPS_CT</a>",},{locus_tag: "ATEG_09065 / 8991...9504 (+)", protein_type: "sulfotransferase", start: 8991, end: 9504, strand: "+", aaseq: "MQAAESVRVQSQIDRRTCRRVKPMKVLVLGLCRTGTLSTWLALQELGYDTYHMTSIMQNPQDAVMWKEAFQGKYYGGKKFTREDWDQLLGHVEAITDFPGAVFVEELTEAYPGRQGRADAARRGRLGWARCGRPS", aalen: "135", color: "#24424F", domain: "–", homologue: "hypothetical protein ApmD (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00350.html' target='_blank'>FBGC00350</a>); identity: 80.4%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF17784' target='_blank'>Sulfotransfer_4</a>",},{locus_tag: "ATEG_09066 / 11538...13076 (+)", protein_type: "–", start: 11538, end: 13076, strand: "+", aaseq: "MQFLWTAALIVGCLGAPLTPPFSKVAESMEGMTQTPMGSVDLALTERDRRVCSSLLYVPRPNPTNALDMMITDSVPWIEQCMIKLPILHGRAILTSAGHCGMYPSVCLNKSELAPLTQASSAFQNNNVLTMLMSLQSLMSAFCVSSFFRQCYTLRGSSRVPVTDQSQRESPTMTTDGDVNPTNDGTVNNNVSFLRFC", aalen: "197", color: "#BBBBBB", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "–",},{locus_tag: "ATEG_09067 / 14046...15301 (-)", protein_type: "phospho-2-dehydro-3-deoxyheptonate aldolase", start: 14046, end: 15301, strand: "-", aaseq: "MPSFTSANEPVLDASNLELLRQKLAEDVRIEKYTPLAPPELVQFEIGLSAESLLTVLNSRIEARQIIRRESDRLLVLVGPCSIHDPETALEYAARLRELAAELRDDLCIVMRAYLEKPRTTVGWKGIINDPDVNDSYNINKGVKIARKLLADITHLGVPVASEMLDTISPQYTADLISVGAIGARTTESQLHRELASGLSFPVGFKNATDGSVNTAVDSLKSMRGRHHFMGTTKQGVVAITTTKGNEDGYVILRGGTRGTNYDAESVKAARELLHSKGERDVVMIDCSHGNSQKDHRNQPKVLKVIEEQLRQGENGIIGVMVESNIREGNQKPAPGLQGCEKGVSITDACIDWETTETSLRSLAQAVKDRRARFSMGKN", aalen: "379", color: "#BBBBBB", domain: "–", homologue: "phospho-2-dehydro-3-deoxyheptonate aldolase ApmC (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00350.html' target='_blank'>FBGC00350</a>); identity: 84.1%", hkg_homologue: "AFUA_7G04070; Phospho-2-dehydro-3-deoxyheptonate aldolase, tyrosine-inhibited; 64.7% (duplicated)", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00793' target='_blank'>DAHP_synth_1</a>",},{locus_tag: "ATEG_09068 / 17287...24406 (+)", protein_type: "nonribosomal peptide synthetase", start: 17287, end: 24406, strand: "+", aaseq: "MPSTIIDDAGRLQQHWSRLVADVTPSHLPSGYLTKQSTQSPIGQLNVSLQLPLIHACCQQCDVSPLGLVQAAWAAVLRSYSGSDDVMFAGIGLEPPTTKKQWTNTSIFRGRLEAENVLISAASEIREEGLLEADALVSVPEALKVFSTLDPKPCNSAIWLRDPASKSELCESDIVNSKTFDYVLRLDPSVSTLSLIFYKPTVSRAQAEYIASTFSDVLQHVCVDPNQTVGNLCHPSELDTLQIETWNHALPRGSTACVDQLIEEAVQRSPDAPALLSWEGQMTFSEFNQTATKLAAYLDQAGVQRGQLVPICFEKTMWTIITMIALWKVGAGFVPLDPKHPRQRMETIIESVQARTVIVSATNQELLAGSVPQLITLDAKLAGEILAGEPVDFPSRSQPHDVSSVPTRLLSALLKSSRPSSLGVVSVSRPTTTVTPTFALSSGPGMLTGPSFTPSFARSVHHEDVPSLETLIVAGEAVAQDIIDRWSTRAQLINIYGASECSVIMVGPMSKDTPRTCIGRATGGLSWIVDANDHDRLVPIGAIGELVIEGPTLARGYLADPEKTDAVYISDPFWARKPGMTRRFYKTGDLVRYGDDGRVHLIGRKDLQVKIRGQRVELTEIEAHMRAINNNVKTAVAMVHPGGKAMLAAFISAQSGFGPEFASPFHAAPDNKAEITALASEMNSRLAERLPPYMIPSAFLPLLYMPLTASGKTDRRLITTYGSSLSPAEIAAVAGSGAASRPRRPSTAAEMKLQQLWAEILHCPAEEIGAEDNFFHMGGDSIEAMNLTRRCRAEGFQLQVSDILKNLVLSDMAKVMTRGAFAEVTIGKPFELLGDDVETIRSNVLSATGFNDPELIQDAYPCSPLQAGLMALSTKISGSYIARHWLELPSSLSVNRFKELWELIVSNNDVLRTMMVDTDDYGTVQVVNRARVQWNHDVDLENYLQNDEKQPMLMGDPLTRYAIISGEQTYFVLTIHHAIYDGLSLEIIWNDLVQAIQGTVPPLRPQFRNFVQHVEEMNANKETKEYWRNELSDGDLIPFPTLPSATYQPVANDAYIHTLQLNRNGPSDYTTATLIRAAWALLQARYCDSPDTVFGCTVSGRNASVPGVEDMVGPVIATVPVKAHVDGQQSVADYLNMINTQSVDMTKTQNYGLQNIARVSDTAAAACGFQTLLVIQPATSVPEDSVLPPFSAPRAKFSTVALTLECSLSADGGVLIHVYFDNAILPQAQIVRIVNQFEHVLQQLAVTPTGKISELEMISPQDKDDILGWNRTIPDVIDDCVHNLIAMNTIKTPHAPAICAWDGELTYAELESISSKLAAHLVNLGVGPEVFVPLCFEKSMWTIVAMIATMKAGGAFVPMDASQPTSRMKLVVKEVGAHLMLCSENELGRCPGLVEKAIAVGPGMTQAATPKTMPTPVKSTNAAYVIFTSGSTGTPKGSVVEHRAFCTGAISHKEGLQMGSRVLQFASYTFDASILEILSTLVQGGCVCVPSESERRGNISEAITRMNVDWAVLTPSFVNTIDPTTVPTLKTLVLAGEAMTAAHVAAWTPHVQLVNGYGPSECCVCSSSNRRVLPGTLPNDIGTSVGAACWVADRVDHNKLSPIGCIGELLVEGHTLARHYLNNQEKTDAAFIPRPSWLPWTRCDRLYKTGDLVKYAPDGSILFIGRKDTQVKIRGQRVELGEIEYHLCLPAEVTQAVVAYPKKGLYANKLTAILELSGATGSDMVPLSKARIQRTGFDLGSLSHYLSETLPVHMVPVIWIIVEKIPSSSSTKIDRKTVDNWLAALPSDFEPTMGIKQEGPATSTLSAHESKAMAISKKIAALINRDDTPIEGRDFNISSMGIDSVQVISLASFIKQNFGVKVDVSRILDGHMTVRSLASFIDAELNGTKKEEVPTFDVMKEASSILKNIIKNSAVRKTVFVTGVTGFLGTQILRQLCERSDVGRVIAHVRASTPSEAFMRVKDAAIRAQWWTDYYLGKLDVWAGNLAKPQLGLKPRQWASLTGESPNDGLVHAIIHAGAAVNWNAGTNILRAANVDSTAELIKASVTSPARPRLIYVSGGHKWSLDETDQDIAREVSQANGYAQTKYLSELLVKQFAARYPNQFAIIKPGLILGTPEEGVANTDDFVWRLASAVVDARCFSQDHGDGWMFVTSSTRVAEETINQAFCPAHAMKTVTYMTDGITEREFWEVFSRELKYPIRPVSHSAWMQTMHSSIQKETNSHPLWPVSQVFDAVQGHLGVDSLEDTSIVTPSQKQHVKATIRRNVQFLVEAGFIASPTGKKMQYMAEKVFQRSGNVWENVKGMVNAL", aalen: "2307", color: "#005493", domain: "A-T-C-A-T-R", homologue: "nonribosomal peptide synthetase ApmA (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00350.html' target='_blank'>FBGC00350</a>); identity: 70.8%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='protfam.html#NRPS_C' target='_blank'>NRPS_C</a>, <a class='funbgcs' href='https://www.ncbi.nlm.nih.gov/genome/annotation_prok/evidence/TIGR01733' target='_blank'>AA-adenyl-dom</a>, <a class='funbgcs' href='protfam.html#ACP_PCP' target='_blank'>ACP_PCP</a>, <a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF07993' target='_blank'>NAD_binding_4</a>",},{locus_tag: "ATEG_09069 / 24834...25985 (+)", protein_type: "aldo-keto reductase", start: 24834, end: 25985, strand: "+", aaseq: "MDAFAPAPEPPTELGRYRVLSSTAGIRVSPLQLGAMSIGSAWAQGMGSMDKESSFKLLDAFVEAGGNFIDTANNYQNEESEAWIGEWMAARQNRDQLVIATKYTGEYKAYQLGKGKTVNHAGNHKRSLHMSVRDSLRKLQTDYIDILYVHFWDYTTSLEEIMDSLHALVQQGKVLYLGISNTPAWVVSAANTYARLQGKTPFSIYQGRWNVLLRDFEREIIPMARQFGMALAPWDAIGGGKFQTQKALAERQRNGEGLRKLMGGEQSAAEVQMSEALAKVAAEHGIESVTAIALAYVLSKTPNVFPLVGGRKIEHLHDNIKALSIRLTDEQIKYLESVKPLDVGYPHNMLGEEPGLTGHAGMPLAPSGQMAFVKYPKAIGYDG", aalen: "383", color: "#531B93", domain: "–", homologue: "aldo-keto reductase DhiC (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FPROT00036.html' target='_blank'>FPROT00036</a>); identity: 68.6%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00248' target='_blank'>Aldo_ket_red</a>",},{locus_tag: "ATEG_09070 / 26147...26743 (-)", protein_type: "–", start: 26147, end: 26743, strand: "-", aaseq: "MKLSLAAVSSFVAASVAASLPAAFTLVADGGNTVLTDGTNAYISKNGSDYPALDILILHSSNNQVTYTAEDSTPTGWQNLYVVEGKVDPIALTVPHSGATPDGANMTGFGMTDDGYFTFNGVQAFVVDPNAGERQEIYYQSPNVPTPFTSAFLWVKECKGC", aalen: "161", color: "#BBBBBB", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "–",},{locus_tag: "ATEG_09071 / 28040...29662 (-)", protein_type: "major facilitator superfamily transporter", start: 28040, end: 29662, strand: "-", aaseq: "MDTNKPGATHNEGHELTKPDLDAIHVVRVPLTEEDSKRIRRKTDRVILVILVWVYFLQILDKSVLGYGATFGLKDDTHLTGNQYSLIGSISPIAQLAWQPFSSFLIVKVPHRILMPTLILGWGIAQACMAACHSFSGLMATRFFLGLFEAGCLPLFSIITSQWYRRAEQPLRVAAWYSTNGLATIIAAILSYGFGHITSGLLKEWQIIFLFAGLLTIISAPVVYWRLDNDVASARFLTDQEKLQGLERLRANQTGAGNREFKISQVVESGLEPKTYLWIGMAFLLNVGASVTNVFGPLILSGLGFDKYQTTLLNMPFGALQFIIILLASYLAQKARLKAAILAGFMLPVIAGLVMLHVLPRNDSVQGALMAGYYLLAFLFGGNPLIVVWIVGNTAGTTKKSIVMSLYNAASSAGNIVGPLLFNEADAPAYQPGLRACLGIFVALVAIVLIQWANLFVLNKMQERRRVRNGKSAKLVDRSMQAHFQQAGGDAAVEDGGNHEVGNNAFLDLTDRENDEFVYIY", aalen: "521", color: "#000000", domain: "–", homologue: "major facilitator superfamily transporter CnsL (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00301.html' target='_blank'>FBGC00301</a>); identity: 37.3%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF07690' target='_blank'>MFS_1</a>",},{locus_tag: "ATEG_09072 / 30992...31710 (-)", protein_type: "–", start: 30992, end: 31710, strand: "-", aaseq: "MDSEEKIPSAITEKGIGFTFTRTWTDDLASRTLPDVLESVYIPGGVYLLSTWYSRYELHKRYSLFYCIGLIAQAIANVLAFGLGKMEGCRIFEGGDGFHHRGVAQITGVVGLLTYFLVVEFPDKCHKSWRFLSEDEAAFIIRRLNIDRDDAVPGDSL", aalen: "157", color: "#BBBBBB", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "–",},{locus_tag: "ATEG_09073 / 33074...34177 (+)", protein_type: "NADH-dependent flavin oxidoreductase", start: 33074, end: 34177, strand: "+", aaseq: "MSSSKLFEPLRVGQVELQHRVVMAPLTRFRNTEDNLPLPIVTKYYEQRASVPGTLLIAEANQISPAAAGMPHGPAIWNEAHVQAWKKVTDAVHAKGSHIYCQLIALGRAAHGPTLQKYGDYEVSAPSPIPMEKDGVPPKELTEAQIQGFIADFAQAGKNAIAAGFDGVEVHGANGYLVDQFTQDVTNQRTDGWGGSVANRARFAIEVARALVDAVGADRVAFRLSPWNTWQGMKMADPVPQFSYLVEKLKELKLAYLHLVESRVINNIDCEKGEGLEFLLDIWGKTSPVLVAGGYTPENCREVDEQYKNNDVAVVFGRHFISNPDLPFRIKNSIALQKYDRDTFYTPIQEEGYLDYPFSPEFTAAQA", aalen: "367", color: "#008F02", domain: "–", homologue: "alcohol dehydrogenase InbE (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00404.html' target='_blank'>FBGC00404</a>); identity: 53.7%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00724' target='_blank'>Oxidored_FMN</a>",},{locus_tag: "ATEG_09074 / 34508...36517 (-)", protein_type: "glucose-methanol-choline family oxidoreductase", start: 34508, end: 36517, strand: "-", aaseq: "MGSIEDMNTYDYIICGGGTSGCVVAGRLAENPDVKVLVIEAGQHNKDLENVHMTGGWSNNFDSETDWNVVTKPMKGVNDRQVKLSRGRFLGGCSGCNGTLCIRGSKQDYNDWGLEGWSGDEFFGAMMKAETFHPKDWFEADMKSHGFNGPLHTEPHDLAPIANLIMDSFVSQGLPLHHDMFSTGDVPHGCGHVPRSVYKGIRTTSADFITNEYHRANVTIQTDTTVDRVLLEETSNGLRATGVVTQLPDGSSKTFYATKEVVVSGGAYCSPAILMRSGIGSREELAQFNIDCKVDLPGVGKNLMDHLIVFMFYETEKEGLTNDWHVYHDDNLAKTYKQWKEQKSGFLSTFPFGCFAFARMDERLKDEPMWRDAPRLPGRDPMGLTPAQPNVEFFTTECYGGPKQYNQFPIDHKHAFSMIAELFAPKSRGTVTLKSKDPKEIPVVDCNYLADPMDLLVLTEACRFGNEIIMKGAGTKDIVKGSWPPNLTHHTYTTREEWIPYVKEHATTCYHAAGTCAMGKDDNPMAVLDNKLRVKGIQGLRVADCSVMPTLHGGHTQMPAYGIGERCADFIKETW", aalen: "575", color: "#008F00", domain: "–", homologue: "glucose-methanol-choline family oxidoreductase PkfF (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00220.html' target='_blank'>FBGC00220</a>); identity: 30.0%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00732' target='_blank'>GMC_oxred_N</a>, <a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF05199' target='_blank'>GMC_oxred_C</a>",},{locus_tag: "ATEG_09075 / 37921...40649 (+)", protein_type: "–", start: 37921, end: 40649, strand: "+", aaseq: "MGTGTPFQKEAWTEYGIGTVIILLRILARAKVVGVKNWQGDDYFTIIALLFWTAELTMLEMIGQFGTNIGFTDAQRAAFSEEEIKVLARGSKCLLAGWTCYVTLIWSLKACMLFFYNRLTLGLWQQKLVKANAFICMGTYTAVILTIFLHCRPLHKNWQVYPDPGRKDLFIIYHHWQWLILPVNCSADYVNYIVIAVTNVTTDAILLTIPLPILAKVRIPLRRKLVIGILLCGGVFVMVATLLRCILSLQSIDSINTSTIWAIRETFVAILSVNAPCIKPLFSSTVWLGSSRETSNKGGRLGSYSLSVFGKSKPSQLASETTNIRHRDSDEYALHDSAYAHDVRGGESASEEELGRRKDAIQVTTMYEARIPRLRRKSRPLSDDPSRRDPLISLPSPSFPPFTMRVTQHVRQPPALEELAAIIQQSLQSNFETASASVVQCPDLRQPPFKLAAPGLCGEACIGDVGARGNLFPRPNLNAKYSLLSLAEDMKMSTEKGFLIGAGAAPFQDIGQNAELAVNLSWQGRSDGAEFNEPSSLVVENKTHVVRISQDSTSTCKTTTSTNCALMMNLFGCHGEAGPVLKVTARSRRGKDNFTNCIRHGLYAAYGDTRPVSLGGVFLLKSGKAKFHIMPDFPPEDQLPFPDREYMEQRWITYHVFKAPIVCLTVLHSADPEGLGLRMEHTHCFEIEGHRQGGHYHHDINDGGDEVEYEAYLNAASLLYRIQ", aalen: "723", color: "#BBBBBB", domain: "–", homologue: "hypothetical protein MosF (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00726.html' target='_blank'>FBGC00726</a>); identity: 25.8%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='protfam.html#TwmC' target='_blank'>TwmC</a>",},{locus_tag: "ATEG_09076 / 42022...43757 (+)", protein_type: "amino-acid permease", start: 42022, end: 43757, strand: "+", aaseq: "MTHDEVTPVAQTAESAVSEKPNVKKDKTAPPESKKDGNPPCINEDAIEKDGGEEPPKELKRNLKSRHLQMIAIGGTIGTGLFIGSGTALAHAGPAGSLIAFAFVGSIVYSVMISMCEVGTYIPIAGSFASMSARLIDPSLGFAMGWIYWFNWASTYAVELTATGLIIQYWDSDLSIAIFIGVFWVVITLLNLLPVGFYGEMEFWLSMIKVLTVLGFMIFAICIDAGAGKQGYLGFDTWKHPGAFAPYLITSSESTAKFVGFYSTLLTAGFSYQGTELVGVAAGETENPEKTVPSAVRKTFIRILVFFVLTIFFIGLLVPYDDPRLATDASDASASPMVIAANLAGVKVLPSLINAVLLTVVISAANSNVYSGSRVLLGLAEQGFAPRFFGWVSKHGVPYVSVIFTALFGLLGFMNVSNSSGQVFNWLVNISGVAGFICWASINASHLAFMRALKARDKSRDTLPYKAIGQPYIAYYGLFFNILIIFTQGFTAFIPTFNVSDFFVAYICPIVFVVLYIGHKVFYRTSFVHPLEADLDTGRLQNYSWETSTPKTWSERIREQI", aalen: "561", color: "#000000", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00324' target='_blank'>AA_permease</a>",},];



// Draw a background line
ctx.beginPath();
ctx.moveTo(0, center);
ctx.lineTo(canvasWidth, center);
ctx.stroke();


function DrawArrow(start_ori, end_ori, BGClen, strand, center, height, color, locus_tag, protein_type, aalen, aaseq, domain, homologue, hkg_homologue, human_homologue, pfam) {
  const start = start_ori * canvasWidth / BGClen;
  const end = end_ori * canvasWidth / BGClen;
  const arrowHeadSize = Math.log(end - start) * 3;
  if (strand === "+") {
    const arrowHeadStart = end - arrowHeadSize;
    ctx.beginPath();
    ctx.moveTo(start, center - height / 4);
    ctx.lineTo(arrowHeadStart, center - height / 4);
    ctx.lineTo(arrowHeadStart, center - height / 2);
    ctx.lineTo(end, center);
    ctx.lineTo(arrowHeadStart, center + height / 2);
    ctx.lineTo(arrowHeadStart, center + height / 4);
    ctx.lineTo(start, center + height / 4);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
    if (
      (hkg_homologue !== "–" && hkg_homologue.includes("duplicated")) ||
      (human_homologue !== "–" && human_homologue.includes("duplicated"))
    ) {
      ctx.fillStyle = "#CCFFFF";
      ctx.fill();
      ctx.strokeStyle = "#005493";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

  } else if (strand === "-") {
    const arrowHeadStart = start + arrowHeadSize;
    ctx.beginPath();
    ctx.moveTo(end, center - height / 4);
    ctx.lineTo(arrowHeadStart, center - height / 4);
    ctx.lineTo(arrowHeadStart, center - height / 2);
    ctx.lineTo(start, center);
    ctx.lineTo(arrowHeadStart, center + height / 2);
    ctx.lineTo(arrowHeadStart, center + height / 4);
    ctx.lineTo(end, center + height / 4);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill()
    if (
      (hkg_homologue !== "–" && hkg_homologue.includes("duplicated")) ||
      (human_homologue !== "–" && human_homologue.includes("duplicated"))
    ) {
      ctx.fillStyle = "#CCFFFF";
      ctx.fill();
      ctx.strokeStyle = "#005493";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };
    
  // Add click event listener to canvas
  canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x >= start && x <= end && y >= center - height / 2 && y <= center + height / 2) {
      // Perform action when arrow is clicked
      document.querySelector('#position').textContent = locus_tag;
      document.querySelector('#function').textContent = protein_type;
      if (domain.includes("CT")) {
      domain = domain.replace("CT", "C<sub>T</sub>");
      }
      document.querySelector('#domain').innerHTML = domain;
      document.querySelector('#homologue').innerHTML = homologue;
      document.querySelector('#hkg_homologue').innerHTML = hkg_homologue;
      document.querySelector('#human_homologue').innerHTML = human_homologue;
      document.querySelector('#aalen').textContent = aalen;
      document.querySelector('#aaseq').textContent = aaseq;
      document.querySelector('#pfam').innerHTML = pfam;
      const blastURL = document.querySelector('#blast');
      const newURL = `https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE_TYPE=BlastSearch&CMD=Web&LAYOUT=OneWindow&PROGRAM=blastp&PAGE=Proteins&FORMAT_TYPE=HTML&NCBI_GI=on&SHOW_OVERVIEW=on&QUERY=${aaseq}`;
      const msg = document.getElementById("message");
      if (newURL.length < 8214) {
        blastURL.href = newURL;
        msg.style.display = "none";
      } else {
        blast.href = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE_TYPE=BlastSearch&CMD=Web&LAYOUT=OneWindow&PROGRAM=blastp&PAGE=Proteins&FORMAT_TYPE=HTML&NCBI_GI=on&SHOW_OVERVIEW=on";        
        msg.style.display = "block";
      }      
    }
  });
}


for(let i = 0; i < geneList.length; i++) {
  const start = geneList[i].start;
  const end = geneList[i].end;
  const strand = geneList[i].strand;
  const color = geneList[i].color
  const locus_tag = geneList[i].locus_tag
  const protein_type = geneList[i].protein_type
  const aalen = geneList[i].aalen
  const aaseq = geneList[i].aaseq
  const domain = geneList[i].domain
  const homologue = geneList[i].homologue
  const hkg_homologue = geneList[i].hkg_homologue
  const human_homologue = geneList[i].human_homologue
  const pfam = geneList[i].pfam
  DrawArrow(start,end,BGClen,strand,center,50,color,locus_tag,protein_type,aalen,aaseq,domain,homologue,hkg_homologue,human_homologue,pfam)
}

function copyToClipboard() {
  const text = document.getElementById("aaseq").innerText;
  if (text.length !== 0) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          window.alert("AA sequence copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      window.alert("AA sequence copied to clipboard");
    }
  } else {
    window.alert("No gene selected!");
  }
}