const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const center = height/2;
const canvasWidth = 800;

BGClen = 39519;

geneList = [{locus_tag: "BDW43DRAFT_304690 / 1...2323 (-)", protein_type: "adenylation domain", start: 1, end: 2323, strand: "-", aaseq: "MHQLKHILQQLIQTPQAKLRDLDLISPEDWATLRDWNAELPRVSQTTLHELAFYHRDSRPAIIAWDGEMTYHQLNQASLDVAQHLMRSGIRHGMFIPFCMEKSQWAVVTILTIFRLGAVCVPIDPNIPAGRAREMIEDMGAQFLVVSAVQRPRTEELGIPILVVPEVAVPTDLVAPLSLPAVHPEDLALVLFTSGTTGRPKGMRIEHCNIATSLLAIVDTLNVNSTTWALHFASYSFDLAIYEIICTLYRGGCLCIPSESKRLNDLAGFMREQQVTWAAFTPSLFSLTRPDDLPMLQTVALGGEAISPSIVQTWAPHVQLVNMYGPTETSICSVGRIPQDRWRVGTIGPMTGGRGWITAATDPEQLVPLGAIGELLVEGPIVVGGYLNRPASLTAEAFINPPSWLRRFRSSCDPAGIPGRLYRTGDLVRYTGQGWIQFVGRRDTQVKVRGQRLELGEVEHRVREVFSSAPDVVVELVPPSAGRSSPILVAFIPVQQDDVPLHNAPAMLCEISNAFQSQIQEASAALRDLLPTYMIPSLFVPVTHLPRTITAKTDRAQLRRLVVDLRWRELEVFFPDRSSSLSNGEGASSCDAQSQELQILVTVVANVLACDIADIRTNESFLSLGGDSLSAMKLVGLARAAGLTLSVLNILRSPSLQELAKPAAALWYGCRLRRKRLRKLRMFSQQLRDRSICRISRASIYCSGFKDPRTMPGCSKRVNAWCTTIPSYGLFSSDPGIKCTR", aalen: "741", color: "#011993", domain: "–", homologue: "nonribosomal peptide synthetase AceN (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00178.html' target='_blank'>FBGC00178</a>); identity: 99.2%", pfam: "<a class='funbgcs' href='https://www.ncbi.nlm.nih.gov/genome/annotation_prok/evidence/TIGR01733' target='_blank'>AA-adenyl-dom</a>, <a class='funbgcs' href='protfam.html#ACP_PCP' target='_blank'>ACP_PCP</a>",},{locus_tag: "BDW43DRAFT_316917 / 3223...4514 (-)", protein_type: "polyprenyl pyrophosphate synthase", start: 3223, end: 4514, strand: "-", aaseq: "MLNLTVANVFAFIFRYLLPIGCFFNNYSSVPTDRYMPLDIKGFQRFHGEPDPALSTAEPGDEEDQEPNQAADPYEKIIRGPVNYLVSIPGKNIRGKLISAFNEWFHLPEDKLDIIKEIIDGLHTASLLIDDIQDGSQLRRGRPVAHNIFGVAQTINAANYAYFQQQEKLDKIDDPRAFPIFTRELLNLHRGQGMDLYWRDALVCPTEEEYIQMVIYKTGGLFRLALELMQIQSTVTTDFSRLVELLGVTFQIRDDYMNLQDGLYAEKKGLMEDLTEGKFSYPIIHSIHAAPGNTQLISILKQRSEDEAVKLYAVQYMESMGSFQYCREVLSRLMEQTRSYISELESSLGPNRGLHCILDLLHVQPPNRKPRI", aalen: "372", color: "#0000FF", domain: "–", homologue: "geranylgeranyl pyrophosphate synthase AceG (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00178.html' target='_blank'>FBGC00178</a>); identity: 99.2%", pfam: "<a class='funbgcs' href='protfam.html#GGPS' target='_blank'>GGPS</a>",},{locus_tag: "BDW43DRAFT_316918 / 5605...6738 (-)", protein_type: "epoxide hydrolase", start: 5605, end: 6738, strand: "-", aaseq: "MPRATAAALASVSLFAAYAKYYQSFQNGFIDLLSSMADRKSLSGLPGGLQEDYTGIRPLDQFMTACNVFFWPVFQGGSPTLSLYGVAFASAMVPMWLLIVVETHQRRHPLAALVVVAFVAGPLIQGLGPGLVMPAILAFMSVSTHAQRLPFRSDLGSFPLSIILGYILPLSLAALAAPTVIAYDTKQQIIALWQGWPLYTSLLMGISRWLTHAQLPQPPQLKVACVFALACSTAGHLAFLCVTALGGYPKDPIHLTGIYSRRVYLPPAPWGETQVTSLETGVLRFLQWDYTLSALAMLFWTVAVYYRATRRRNRRSPWVLLMGRVVVGTIFLGPCSVAIVLYWETIALVADKGRNEL", aalen: "357", color: "#0096FF", domain: "–", homologue: "hypothetical protein AceA (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00178.html' target='_blank'>FBGC00178</a>); identity: 98.6%", pfam: "<a class='funbgcs' href='protfam.html#CtvD' target='_blank'>CtvD</a>",},{locus_tag: "BDW43DRAFT_304692 / 7087...8820 (-)", protein_type: "FAD-dependent monooxygenase", start: 7087, end: 8820, strand: "-", aaseq: "MSKSEFQVIIVGGSIGGLTLAHCLQHAGIDHIVLEKASNPAPQIGASIGILPNGARVLDQLQLYDQIERSIEPLETAIIGYPDGFSFSSSYPKIINKRFGFPIAFLDRQRLLEILYQNYPDGSKIRLGEKVTAIHPSSGRVTVTTAKGSVYHGQLVIGADGVHSQVREAIWRAGENMSSSSAIAKDRFSLTVEFRCMFGISSAIKGLNVGEQVNKFLDGLTIVTIHGKKGRVYWFVIQKLSRKYIYPNGPRYTADDINAAAEVLRNIQVHQDITFGQIWENRETVSMTALEENTLKTWYHGRLVLLGDSVHKMTPNIGQGANMAIEDAAALANLLRRLRISPGTRLPTDGQIETLLRQYRSIRYHRVDSIYRSSQFLVRFQARDGLLNTLFGRYYAPYAGDLPADMASKTIADGVICDFLPPPKRCGGGWEQYRRKTPRWGWEVQTTLSILVLAILFSKHHSIRPALRRVQPR", aalen: "473", color: "#008F01", domain: "–", homologue: "FAD-dependent monooxygenase AceM (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00178.html' target='_blank'>FBGC00178</a>); identity: 98.7%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF01494' target='_blank'>FAD_binding_3</a>",},{locus_tag: "BDW43DRAFT_304693 / 9217...10027 (-)", protein_type: "Pyr4-like terpene cyclase", start: 9217, end: 10027, strand: "-", aaseq: "MDGFDASQAPPEYLAVKPLADLFVLGMGLGWVINYVGMVYVSFKERTYGMAIMPLCCNIAWEVVYSLIYPSKSLVERGVFAAGLLINLGVMYAAISFSPQEWSHAPLVERNLPWIFALGTIGFLTGHLALAAEIGHSLAYSWGAVVCQLLLSIGGLCQLLCRSSTRGASYTLWLSRFLGSCCTVGFASLRWMYWPESFAWLNSPLVLWSLAVFVMVDGSYGVCYWYVKGYEKSVGIVRARKIT", aalen: "243", color: "#945200", domain: "–", homologue: "terpene cyclase AceB (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00178.html' target='_blank'>FBGC00178</a>); identity: 98.8%", pfam: "<a class='funbgcs' href='protfam.html#Pyr4' target='_blank'>Pyr4</a>",},{locus_tag: "BDW43DRAFT_324031 / 10857...11969 (+)", protein_type: "IPPS-type prenyltransferase", start: 10857, end: 11969, strand: "+", aaseq: "MSLIANLPEMCLRGASPVLGMVAVSGFLCFFIDHVPVPRWWDKKAQLIGQKHPESITSFECPYDYIRQIYGKYHWAPFVNKLAPTLRSDDGSKYQMVLEIMDAIHLCLMLVDDIADGSEYRKGRPAAHNIYGPSETANRAYYRVTQILNQTTKEFPNLAPWLMQDLQDILEGQDISLVWRRDGVSSFPTAATDRVAAYRRMASLKTGALFRLLGHLVLENDSMDETLTLVAWVSQLQNDCKNVYSSEYAKLKGSIAEDLRNREMTYPIVLALDAPDGHWVTAALESPSPQNIRNALKVIRCDCVRDICMAELARSGASVKEWLELWGRKEKLDLKA", aalen: "336", color: "#0000FF", domain: "–", homologue: "prenyltransferase AceC (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00178.html' target='_blank'>FBGC00178</a>); identity: 99.7%", pfam: "<a class='funbgcs' href='protfam.html#PaxC' target='_blank'>PaxC</a>",},{locus_tag: "BDW43DRAFT_254844 / 12769...14653 (-)", protein_type: "cytochrome P450 monooxygenase", start: 12769, end: 14653, strand: "-", aaseq: "MLAQLFQVVQFLREEAGLIWTCVTLVLFVYLLLPKPTYSTNVKVPTVKFGSPWIPEILNRILFNTYAPSVIYDGYSKYKKSAYKILKPDGDLVVLSTKYAEELRQLPSSTLNALEATFTDHVGDYTTILTDSHLHTEAIQKRLTPAIGRLIPRITSELDYAFEVEFPRCDDKFVAINPYEVFLRLVARVGARIFIGDELCREEKWLNASISYTKDIFLTIALMRPLPGFLHPIVGRILPSSRSLDRQLVYVKEELLGPVIEKRRRMEAASDPNYEKPDDFLQWMMDLAKTENESHPHNLAQRLLGITSMAVVHTSAMSLTHILYDLLVMPHWLQPLLDEVQTQVPDWKNVTQAELNNLKFMDGFLKESQRLNPPGELAFHRVVKHDLTLSDGLLLPKGTHICMASGPISRDPEVIGDPEVFDAYRFIKQNTATSGFVSTGPNNMHFGLGRYACPGRFFASFVMKLILSHFLMEYEFRFSTEQKERPKNLLIGDKIVPNVSTAILIKKRVSDV", aalen: "512", color: "#FF8AD8", domain: "–", homologue: "cytochrome P450 monooxygenase AceP (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00178.html' target='_blank'>FBGC00178</a>); identity: 99.4%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00067' target='_blank'>p450</a>",},{locus_tag: "BDW43DRAFT_316922 / 15412...16287 (-)", protein_type: "methyltransferase", start: 15412, end: 16287, strand: "-", aaseq: "MRETESQLPTNKTTGYDTVYAVDFYHSITQIPGLLQDAFIYLGAYQQALQLRISQPTQESPFVILDVCTGTGRVIRDLVAHLSQRGDALDATKFLGLDISQLMLDQAAKLPLASPTADVTWIQGSALDLSGVPAFCDGSLKVDLLIIAFSSISHFIEPGQGAQFLQEVARVLKPRTGRAYVSMRDITSTVHSDPATSGGEVQRQELPSSVLPGISYCQIGNQVQVSDNVVYVISDVEVLNGDGNIIGTELATTAFRIWKENELQTVASNVGLNLLEIVEEGGESFYVLQLP", aalen: "291", color: "#FF9300", domain: "–", homologue: "methyltransferase AceT (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00178.html' target='_blank'>FBGC00178</a>); identity: 99.0%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF13649' target='_blank'>Methyltransf_25</a>",},{locus_tag: "BDW43DRAFT_316923 / 16991...18885 (+)", protein_type: "cytochrome P450 monooxygenase", start: 16991, end: 18885, strand: "+", aaseq: "MTIIYQGFGLLASSLVVLFLYKVTYARKKFSNLPKPPDTLVFGHWLLLLREWMSSPKDMFPAYILDGVRRKFDLPPIFFLDLYPMFPPVVVISDPKIARKITLEDRAPRCPGVFQPLKPAATRRWIETLSRDNWVKNHALFGVSFTAAHFVRMIPRMSEDLGPMVQMLVQYSQTGQVFKMEKMAKLAILEMTGRAIFARQLGTFADHSEWSAAYDGAVSFISAARNPFKRPFIMGKWRKRCQVFHALIREEICACFREQTSKVRPKPSLLHSSFTAYLGDKLPQFLSSPCQNGEMSEEYVQELVSSCAGAFLAAVSGSAALSYCLMLLHQHPNIARRVQAEHDDIFSSDRNITLQLLKTNPERLNQLVFTLAVVKETLRLFSMGVILRQPSSDTVISNDGQIYSLRGHIVVLFHTAMHRRPDLFPEPDKFDPDRFMPGSRPKVPSDAWRPFEKGRGNCTGQELALVQLKLVLLLVVREFDFELAYESRSSRGPDIYGGPAYVTLSGTGPGPAGGMPMRVVQRSELGPR", aalen: "528", color: "#FF8AD8", domain: "–", homologue: "cytochrome P450 monooxygenase AceR (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00178.html' target='_blank'>FBGC00178</a>); identity: 99.1%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00067' target='_blank'>p450</a>",},{locus_tag: "BDW43DRAFT_304696 / 20037...21999 (+)", protein_type: "cytochrome P450 monooxygenase", start: 20037, end: 21999, strand: "+", aaseq: "MLQQVDVPSVGKHGILGSWVTAFQWQHKARSLIQEGYEKHGDYAFKVATPSRWEVFICNEKMIKEYKSLMDNQFSANAVTADMFQTRWTAPGAAEGVHKIPVPLLSKGLTWQRNRSTAADDPYFSEFVTEFLHAWEAEVKIASNGPYDFCCFETGTRIVAHLTAKSLVGYPLCRDPEVIELFAQYGNAVPTSGFFIAMFPGFLRPFVAKFCEAPRISARLDTIFLNEMKERHLHPGGEASDIMSWLWHWTRQNEPGKYSELDIARSITSAVFGAIHTTTQVLVHCLFELATRPEYIDPLRSEAQQAFDRHGGWKKDTIESMLKIDSFIKECQRWNPLDSGSLARCATKDFTFSTGLKVPKGTYVFAPNAPILFDERNYPNAHEFDGYRFYRLGQQTGKPQDFRFVATNSKYLQFGDARHTCPGRYMAADEIRLMLGYILLHYDITPKDNRGRPKNWFFKKILFPDMKGLVVLRVRSARGFHT", aalen: "482", color: "#FF8AD8", domain: "–", homologue: "cytochrome P450 monooxygenase AceQ (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00178.html' target='_blank'>FBGC00178</a>); identity: 95.6%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00067' target='_blank'>p450</a>",},{locus_tag: "BDW43DRAFT_316925 / 26340...28508 (+)", protein_type: "major facilitator superfamily transporter", start: 26340, end: 28508, strand: "+", aaseq: "MDESSPLLNSGQPHANQEVKEGISKIFLLATMTGTFLAMADESFVLSNSEEIGGQFRQSSFGPWILCSYNLGYCVALPLYGYLCNTCGHKPILLAALTTFAFGSLITGVAVSMPMLIAARVIAGVGGSGLVDVVSIMINDLLPISEVAVLRGYLSFVSMVGVCSGSPLGGLLMDSIGWRWSFAGQVPIILVILLITALQCPRTSGCNSRQGEFRQLDVLGLSFMTAAIGSLVILLQIIQQSRMKDNLWVAALFVVFLLSTVSLVFTEVFYAKDPLIPIREIKRNGSGVLCLLQTVIMFAQFALIANLATFFVRIRQVNNSTAGLVLLPLALAVALGSVGAGHIIKKYIFTSFFAVILAKASYTIAGLLWRQSPSYLGLIPASLGSLGVGSLVAAQFVAISVRTPSEHANSSITTYWLAQQLGMILGVAVAALLSQRVLADALQSLLKGLPNSSEIIKTVLNDNRALPSLPKPVQGLVRTAYLDSFQSVLILAVSGTALGLLIVIFMREYPIDT", aalen: "513", color: "#000000", domain: "–", homologue: "major facilitator superfamily transporter Brq6 (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00624.html' target='_blank'>FBGC00624</a>); identity: 29.2%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF07690' target='_blank'>MFS_1</a>",},{locus_tag: "BDW43DRAFT_324032 / 28996...29898 (-)", protein_type: "methyltransferase", start: 28996, end: 29898, strand: "-", aaseq: "MLEPERIHDFLTWEGEGDITKLLQGDAGNLLHGYSHIAHEDMEGHVKRIAKTAYDVWHYPCFQMFWFLRFELSRSSVYHSILQAVKSGKVLADLGCAFGQDLRYLTYQGAPSENLVGLDLRQDFINLGYELFNDRSTFKARFLTQDFFADTPAILDLLGKVDIINAGYFLHSWDWDGQLQCSKRMIQLMSPSPGAIMTGIQFGSHATGLWSTTPSGVEAGPIFLHDNDTLKTLWDQAAQETQTSWDVQITVEEDPECTSFDPQGCHLRWVVTRK", aalen: "274", color: "#FF9300", domain: "–", homologue: "methyltransferase NvfJ (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00016.html' target='_blank'>FBGC00016</a>); identity: 34.5%", pfam: "<a class='funbgcs' href='protfam.html#Trt5' target='_blank'>Trt5</a>",},{locus_tag: "BDW43DRAFT_324033 / 30432...31502 (-)", protein_type: "–", start: 30432, end: 31502, strand: "-", aaseq: "MTTSIIPPALNKGNTIAFVSPSLRLNDDFPTPLARGKAFLETLGFPVKVIFQSLPPNATIADSVRVRCKELHAAFTDPEVKAIICTSGGSHANELMSSLDYDLIRAHPKIFVGYSDITCLHMGIQSQTGLRTFYGPTVLSELADFPAPMQFTVNHLLHVLCEDSKPVGPLPRSEICTAEHNEFFFRDEAIEVPRPIVRAPPWRWVRQGHTTGCLQGGTVEYVVRLLATPYILTTPCQGLILVLESAMGDDMRLPYTVDKFRQSLVELAISGVFCNITGLVIGRGYKYDEQMQDQLATVVTQVFDALVNPSGNVPVLMNVDFGHSSPLLTLPLGAVARLDSESDEFTVLEAGVRPQM", aalen: "356", color: "#BBBBBB", domain: "–", homologue: "–", pfam: "–",},{locus_tag: "BDW43DRAFT_316928 / 32189...39519 (+)", protein_type: "nonribosomal peptide synthetase", start: 32189, end: 39519, strand: "+", aaseq: "MRGNSVSPGLSPALASSPSQKTLDPGVLQRETVCIPVESLTADLSKQWLDDDGVRWGIIIQAAWAIMLRLYSADDYVLFGSVSMERNDVNLGGLKLSAFKIHSYDRHFLGSTIVQHLLSPTPLAGCLCGCSMSARDNIQMHENGDWHFNSCIFFDLDSQFESTRLPIDNEFPVIVYLWGNHPTQAPFVTICYSPTALSDKQAASLAGTLNQTIKEILIHQSKRVKDLDICSDADLHCVLRWNQNLEHPIRPKLVHEMIQQQSHQQPAAPAISAWDGDVTYAELDSIATRLAIQLKRLGVGPEVFVALCFDKSKWAVIALMGVIKVGGAYIFLDPSHPPKLNQHVCQSAAVQVLVCSPVHASFAEDLADRVIALDTDFLPLLDPEPTNRGKQESDLPSPHNALYAIFTSGSTGEPKAIVTEHSAFYSIASANANAMGLGSNSRVLQFASYTFDVSNRDVLLTLMFGGCICIPSESDRINDLAGFITRHNVTCASLTPSVSDVIRPSSVPSLKTLILGGEPMTAAHIHRWAGKVRLINAYGVSESTGVAALASDIGLGHSPKNIGRGCGSRLWIVNPDNPHQLSPIGAVGELVIQGPAIARHYLHDKERTERHFLRRLDWQRRLRTSSDLNYRFYRTGDLARYNQDASIEYVGRSDSQVKINGQRLNLDYIEYHIRECPVLKSLAIFNVNVIATSIADSSRIRLVAFLDIGEGLGQKDGHHSPTWIAPDSVSGPWINALQKNLSSTLPSYMIPAHFMFAYYLPLTRSGKVDLPELRRIAAELELQDRLLNEGYNKISSGNPPSSGSGDETGLPLSPYKYTLQTSWAEILDKRTSQFRQHDNFFTHGGDSVEAMKLVATLRTKGLKLSVADVFKHPTLSGMAWCLRRLPADLSSAPASIYPFALISERPDLIDEVKQQLGISMDEIEDAYPCTQLQEGLVALTAKAPGAMIARYCWRLPDVLDLDRFRAAWEIVWTMNPILRTRIVIVPHGAFQVVIRAKMPWETTTKKDLHAPKIKLDSGPLIHFGLCLDSQELILHLHHAIFDGWSIGQTLEQVEYVYHGGKIDLRPFNLFVKYALDQHSTVSDEFWRAECDALEAENFPCPPSAIPRDDRNMVLEHVLEIEFNTSMDCTISSILRLAWAIVLWRQTGSEDVLFGTTLMGRNASMEGIEKVSGPTLATVPVRIKVPTGKSIREGLHEVQEQFLRMVDYEQIGLQRIRQAGPWPAAACEFQNLLIVHPHRRQVPNSNLFVQAQEVHDNLKAFTTYPFMIVCTPDDRSICLQASFNTECVPQAKAEQILAQVAHVCRQLMVSQLKIADISLVTPQDMTQLRQWNSHVPNGTHACIHELIQKRCRTLPGALAAQSIDYELTYGQLDQYSTYFANRLVALRVQRGDLVPVLFEKSIWTTVAILAVLKAGAAIVTMDPSYPFQRLREICTDVCAKVVITSTACAAISSKLHNHALVASCPDANWDPTEEMEVGLELPSTTPDDPAYLIFTSGSTGKPKGVIIQHSAISSSALAHIDQLQMSPKSRVFQFSSYAFDVGVGDILFSLVAGACICVPNDVDRRDNPTKAMADLRVNVAILTPSVIALIDPVEVPTLEILASVGEPLTTGVAQKWPNEVSLVNAYGPAECSVSATFQLDVRRDSNPGNIGFGTGAVCWIVDPNDHDRLLPIGAVGELILEGPIVGTGYLNDPEKTAAAFIKSPNWLKDFRHPGYHGKLYKTGDLGSYSPDGSLEFHGRKDLQVKINAQRLELGEVEHRIGASLLSSREVVVEVIRSKDSLFGDSSARKLLVAFVCPHETVDWGQSTSSDSSGLEVIENLQDRYYLDIAGLVSQLRERLPSYMIPSFFIPVSRMPLTMSGKLKRRSLREEVSRWPIEKLLCYPSSPRSILQMEPCVTEKQKQIHHLVGKILGLEKTSFGMESNFFTLGGDSITAMRMGALARKEGLELIVEDIFRSSTLSDMAGHLSTQAEHIDRSGPLVAPDAVDMSVNIYQNLNQKVSSDILGNIGEVRPATQFQSMTLRAWYARYLAISLPKVVNNARLSKACQQLVDRHPILRTAFIADDDNRILQLVMRTFDVRITDYSSYDLATHCAEDSISMPSALDGTPPFQVQMVATDKAQVFLILRLVHAQFDGLSLPVICEDLSAAYNNQALEPTASFVSHLCESQAGRTGVAYPAWQRVLGGAKMTDLHRFKRHHLTPRIDSPIEVQSRKSNAPQLVTATKTIPFVNPPSQITMATLVKAAWAITLMNCITFADQTDVVFGQVVHGRVLGIPHEERIVGPCLNIIPVRIKFMPSPTDGVEKMALLRQVQEQHLQTMPFENLDFSDIVRNCTRWPSNTTFGSFVRFQGIDIQPACDLDGVICETSLESLPNPPSNTANVLVVPHGSELRVTMTISDQTLDWEAAQELVQHLCNAIECLAAL", aalen: "2421", color: "#005493", domain: "A-T-C-A-T-CT", homologue: "nonribosomal peptide synthetase ChyA (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00353.html' target='_blank'>FBGC00353</a>); identity: 43.6%", pfam: "<a class='funbgcs' href='protfam.html#NRPS_C' target='_blank'>NRPS_C</a>, <a class='funbgcs' href='https://www.ncbi.nlm.nih.gov/genome/annotation_prok/evidence/TIGR01733' target='_blank'>AA-adenyl-dom</a>, <a class='funbgcs' href='protfam.html#ACP_PCP' target='_blank'>ACP_PCP</a>, <a class='funbgcs' href='protfam.html#NRPS_CT' target='_blank'>NRPS_CT</a>",},];



// Draw a background line
ctx.beginPath();
ctx.moveTo(0, center);
ctx.lineTo(canvasWidth, center);
ctx.stroke();


function DrawArrow(start_ori, end_ori, BGClen, strand, center, height, color, locus_tag, protein_type, aalen, aaseq, domain, homologue, pfam) {
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
    ctx.fill();

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
    ctx.fill()
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
      document.querySelector('#aalen').textContent = aalen;
      document.querySelector('#aaseq').textContent = aaseq;
      document.querySelector('#pfam').innerHTML = pfam;
      const blastURL = document.querySelector('#blast');
      const newURL = `https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&LAYOUT=OneWindow&PROGRAM=blastp&PAGE=Proteins&FORMAT_TYPE=HTML&NCBI_GI=on&SHOW_OVERVIEW=on&QUERY=${aaseq}`;
      const msg = document.getElementById("message");
      if (newURL.length < 8214) {
        blastURL.href = newURL;
        msg.style.display = "none";
      } else {
        blast.href = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&LAYOUT=OneWindow&PROGRAM=blastp&PAGE=Proteins&FORMAT_TYPE=HTML&NCBI_GI=on&SHOW_OVERVIEW=on";        
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
  const pfam = geneList[i].pfam
  DrawArrow(start,end,BGClen,strand,center,50,color,locus_tag,protein_type,aalen,aaseq,domain,homologue,pfam)
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