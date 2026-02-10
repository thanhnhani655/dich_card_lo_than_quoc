
const yamlStr = `name: Chris (Lan)
life_tier: Giai 1/Phổ Thông
level: 1
race: Nhân Loại (Biến dị Ánh sáng)
identity: Người xuyên không, Nữ sinh trung học
job: Mục sư tập sự (Tạm định)
personality: <q>"Bề ngoài có vẻ yếu đuối, ngây thơ và thánh thiện như một thiên sứ lạc lối. Nội tâm nhút nhát, hay lo lắng và cực kỳ thiếu cảm giác an toàn. Tuy nhiên, cô ấy có xu hướng sùng bái và dựa dẫm tuyệt đối vào người mà cô ấy tin tưởng là \"mạnh mẽ\" hoặc \"người hùng\". Một dạng Simp chúa ngầm, sẵn sàng dâng hiến tất cả cho thần tượng của mình."</q>
favorite: Trà sữa trân châu, truyện tranh thiếu nữ (Shoujo manga), những người ngầu lòi, sự an toàn.
appearance: <q>"Tuổi 18. Cao 1m60. Mái tóc dài bạch kim óng ả (do biến dị khi xuyên không). Đôi mắt to tròn màu xanh biếc ngấn nước. Làn da trắng sứ phát sáng nhẹ. Thân hình mảnh mai nhưng \"điện nước\" đầy đủ, vòng 1 khá đầy đặn ẩn sau lớp áo."</q>
clothing: Đồng phục học sinh cấp 3 (kiểu Nhật) rách rưới, lấm lem bùn đất. Áo sơ mi trắng, váy xếp ly xanh đen, tất đùi trắng (một bên bị rách), giày lười da nâu.
attribute:
  strength: 2
  dexterity: 3
  constitution: 3
  intelligence: 6
  mind: 6
resources:
  HP: 320
  MP: 600
  SP: 250
skills:
  - name: Hào Quang Thiên Sứ
    quality: Hiếm
    type: Bị động
    cost: Không
    tag: <q>"[Tinh thần][Phạm vi: 5m][Hồi phục][Uy lực: Thấp][Ánh sáng]"</q>
    effect: Tự động hồi phục 1% HP mỗi phút cho bản thân và đồng minh trong phạm vi. Phát sáng trong bóng tối. Tăng thiện cảm với sinh vật trật tự, thu hút sinh vật bóng tối.
    description: Một vầng hào quang thánh thiện bao bọc cơ thể, mang lại sự ấm áp và chữa lành. Tác dụng phụ: Làm cái bóng đèn di động, rất khó trốn tìm.
  - name: Cầu Nguyện
    quality: Ưu lương
    type: Chủ động
    cost: 20 MP
    tag: <q>"[Tinh thần][Đơn thể][Trị liệu][Uy lực: 50][Ánh sáng]"</q>
    effect: Hồi phục 50 + (Tinh thần x 5) HP cho mục tiêu.
    description: Lời cầu nguyện thành tâm gửi đến đấng tối cao (hoặc vũ trụ), chuyển hóa niềm tin thành năng lượng chữa lành.`;

function cleanYaml(yamlStr) { if (!yamlStr) return ''; yamlStr = yamlStr.replace(/\u00A0/g, ' ').replace(/\t/g, '  ').replace(/：/g, ': ').replace(/，/g, ',').replace(/；/g, ';').replace(/】/g, ']').replace(/【/g, '['); const lines = yamlStr.split('\n'); const sensitiveKeys = ['Thân Phận', 'Nghề Nghiệp', 'Tính Cách', 'Sở Thích', 'Ngoại Hình', 'Trang Phục', 'Tiểu Sử', 'Mô Tả', 'Hiệu Ứng', 'Nhãn', 'Tiêu Hao', 'Loại', 'Hiếm', 'Thần Vị', 'Tên', '姓名', 'Chủng Tộc', 'Cấp Độ', 'Sinh Mệnh Vị Giai']; const attrKeys = ['Sức Mạnh', 'Khéo Léo', 'Thể Chất', 'Trí Tuệ', 'Tinh Thần']; const cleanedLines = lines.map(line => { const match = line.match(/^(\s*)([-\w\u4e00-\u9fa5]+)\s*:\s*(.+)$/); if (!match) return line; const indent = match[1]; const key = match[2]; let val = match[3].trim(); if (val.startsWith('|') || val.startsWith('>')) return line; if (attrKeys.some(k => key.includes(k))) { if ((/[+=]/.test(val) || val.includes('{')) && !/^["'].*["']$/.test(val)) { val = val.replace(/"/g, '\\"'); return `${indent}${key}: \"${val}\"`; } } const isSensitive = sensitiveKeys.some(k => key.includes(k)); const hasDangerousChars = /[\{\}\[\]]/.test(val); const hasQuoteInside = val.includes('\"'); const isFullyQuoted = /^["'].*["']$/.test(val); if ((isSensitive || hasDangerousChars || hasQuoteInside) && !isFullyQuoted) { val = val.replace(/"/g, '\\"'); return `${indent}${key}: \"${val}\"`; } return line; }); return cleanedLines.join('\n'); }

console.log(cleanYaml(yamlStr));
