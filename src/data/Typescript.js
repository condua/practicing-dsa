const curriculum = [
  {
    id: "intro",
    title: "1. Giới thiệu & Cài đặt",
    description: "Tại sao nên dùng TypeScript và cách thiết lập môi trường.",
    content: [
      {
        type: "text",
        value:
          "TypeScript là một siêu tập hợp (superset) của JavaScript, bổ sung thêm static typing (kiểu tĩnh). Điều này giúp bắt lỗi ngay khi viết code thay vì chờ đến lúc chạy (runtime).",
      },
      {
        type: "code",
        lang: "bash",
        title: "Cài đặt qua NPM",
        value: "npm install -g typescript\n\n# Kiểm tra phiên bản\ntsc -v",
      },
      {
        type: "text",
        value:
          "Để biên dịch file .ts sang .js, chúng ta sử dụng lệnh `tsc filename.ts`.",
      },
    ],
    quiz: [
      {
        question: "Lệnh nào dùng để biên dịch file TypeScript?",
        options: [
          "node file.ts",
          "tsc file.ts",
          "npm run file.ts",
          "ts-node file.ts",
        ],
        correct: 1,
        explanation:
          "`tsc` (TypeScript Compiler) là trình biên dịch tiêu chuẩn để chuyển đổi code TS sang JS.",
      },
      {
        question: "TypeScript là gì so với JavaScript?",
        options: [
          "Một thư viện UI",
          "Một framework backend",
          "Một Superset (siêu tập hợp)",
          "Một database",
        ],
        correct: 2,
        explanation:
          "TypeScript là Superset, nghĩa là mọi code JS hợp lệ đều là code TS hợp lệ, nhưng TS có thêm tính năng.",
      },
      {
        question:
          "Trình duyệt web (Browsers) có thể chạy trực tiếp mã nguồn TypeScript không?",
        options: [
          "Có, tất cả trình duyệt hiện đại đều hỗ trợ",
          "Không, cần phải biên dịch sang JavaScript",
          "Chỉ trình duyệt Chrome mới chạy được",
          "Có, nếu cài thêm extension",
        ],
        correct: 1,
        explanation:
          "Trình duyệt chỉ hiểu JavaScript, do đó mã TypeScript phải được biên dịch (transpile) sang JavaScript trước khi chạy.",
      },
      {
        question: "Đuôi mở rộng chuẩn của một file mã nguồn TypeScript là gì?",
        options: [".js", ".txt", ".ts", ".typescript"],
        correct: 2,
        explanation:
          "Các file TypeScript sử dụng đuôi mở rộng .ts (hoặc .tsx cho React).",
      },
      {
        question:
          "Lệnh nào dùng để cài đặt TypeScript trên toàn hệ thống (global)?",
        options: [
          "npm install typescript",
          "npm install -g typescript",
          "node install typescript",
          "install typescript -g",
        ],
        correct: 1,
        explanation:
          "Tham số `-g` (global) giúp cài đặt gói thư viện trên toàn bộ hệ thống để có thể dùng lệnh `tsc` ở bất cứ đâu.",
      },
      {
        question:
          "Lợi ích chính của 'Static Typing' (Kiểu tĩnh) trong TypeScript là gì?",
        options: [
          "Giúp code chạy nhanh hơn ở runtime",
          "Phát hiện lỗi ngay khi viết code (Compile time)",
          "Giảm dung lượng file code",
          "Không cần viết dấu chấm phẩy",
        ],
        correct: 1,
        explanation:
          "Kiểu tĩnh giúp IDE và trình biên dịch báo lỗi sai kiểu dữ liệu ngay lúc viết code thay vì đợi lỗi xảy ra khi chạy chương trình.",
      },
      {
        question: "Lệnh nào để kiểm tra phiên bản TypeScript đã cài đặt?",
        options: ["tsc --check", "ts -v", "tsc -v", "npm version"],
        correct: 2,
        explanation:
          "Đây là lệnh viết tắt của `tsc --version` để xem phiên bản hiện tại.",
      },
      {
        question:
          "Sau khi biên dịch file `main.ts`, bạn sẽ nhận được file nào?",
        options: ["main.java", "main.js", "main.exe", "main.html"],
        correct: 1,
        explanation:
          "Trình biên dịch TypeScript sẽ chuyển đổi code `.ts` thành code JavaScript chuẩn `.js`.",
      },
      {
        question: "Tên file cấu hình mặc định của TypeScript là gì?",
        options: [
          "config.ts",
          "typescript.json",
          "package.json",
          "tsconfig.json",
        ],
        correct: 3,
        explanation:
          "`tsconfig.json` là file chứa các thiết lập cho trình biên dịch TypeScript (như target version, strict mode...).",
      },
      {
        question: "Lệnh nào dùng để tự động tạo file cấu hình `tsconfig.json`?",
        options: ["tsc --init", "npm init", "tsc --create", "tsc --config"],
        correct: 0,
        explanation:
          "Lệnh `tsc --init` khởi tạo file `tsconfig.json` với các thiết lập mặc định.",
      },
      {
        question:
          "Điều gì xảy ra với các 'Type' (kiểu dữ liệu) sau khi biên dịch sang JavaScript?",
        options: [
          "Chúng được giữ nguyên trong file .js",
          "Chúng bị loại bỏ hoàn toàn",
          "Chúng được chuyển thành comment",
          "Chúng được chuyển thành biến string",
        ],
        correct: 1,
        explanation:
          "Các khai báo kiểu của TypeScript chỉ tồn tại trong quá trình phát triển (compile time) và bị xóa sạch khi ra file JS.",
      },
      {
        question:
          "Để biên dịch tự động mỗi khi file thay đổi (Watch mode), ta dùng lệnh nào?",
        options: ["tsc -w", "tsc -auto", "tsc -live", "tsc --realtime"],
        correct: 0,
        explanation:
          "Cờ `-w` (watch) giúp trình biên dịch theo dõi file và tự động biên dịch lại khi có thay đổi.",
      },
      {
        question: "Tổ chức nào phát triển và duy trì TypeScript?",
        options: ["Google", "Facebook (Meta)", "Microsoft", "Mozilla"],
        correct: 2,
        explanation:
          "TypeScript là dự án mã nguồn mở được phát triển bởi Microsoft.",
      },
      {
        question: "Công cụ `ts-node` thường được dùng để làm gì?",
        options: [
          "Để chạy TypeScript trên trình duyệt",
          "Chạy mã TS trực tiếp trong môi trường dev",
          "Để nén file code cho nhẹ hơn",
          "Để cài đặt các gói thư viện",
        ],
        correct: 1,
        explanation:
          "`ts-node` biên dịch 'on-the-fly' và chạy code ngay lập tức trong Node.js, rất tiện lợi khi dev.",
      },
      {
        question:
          "Nếu file TypeScript có lỗi cú pháp, lệnh `tsc` mặc định sẽ xử lý thế nào?",
        options: [
          "Tự động sửa lỗi",
          "Dừng lại và không tạo ra file .js",
          "Báo lỗi nhưng vẫn cố gắng tạo ra file .js",
          "Xóa file nguồn",
        ],
        correct: 2,
        explanation:
          "Mặc định, TypeScript vẫn emit (xuất) ra file JS kể cả khi có lỗi type, trừ khi cấu hình `noEmitOnError: true`.",
      },
      {
        question: "Yêu cầu tiên quyết để cài đặt TypeScript qua npm là gì?",
        options: [
          "Phải cài đặt Java",
          "Phải cài đặt Node.js",
          "Phải cài đặt Python",
          "Phải mua bản quyền",
        ],
        correct: 1,
        explanation:
          "npm (Node Package Manager) đi kèm với Node.js, cần nó để chạy lệnh cài đặt.",
      },
      {
        question:
          "TypeScript có hỗ trợ các tính năng của JavaScript hiện đại (ES6+) không?",
        options: [
          "Không, chỉ hỗ trợ ES5",
          "Có, và có thể biên dịch xuống phiên bản cũ hơn",
          "Chỉ hỗ trợ nếu cài thêm plugin",
          "Chỉ hỗ trợ trên Windows",
        ],
        correct: 1,
        explanation:
          "TypeScript cho phép viết cú pháp mới (ES6+) và biên dịch xuống ES5 hoặc ES3 để chạy trên trình duyệt cũ.",
      },
      {
        question:
          "Để biên dịch cả dự án theo file config, cách tốt nhất là gì?",
        options: [
          "Gõ `tsc` từng file một",
          "Gõ `tsc` tại thư mục chứa tsconfig.json",
          "Copy tất cả code vào một file rồi biên dịch",
          "Dùng website để convert online",
        ],
        correct: 1,
        explanation:
          "Khi có `tsconfig.json`, chỉ cần gõ `tsc` là trình biên dịch sẽ tự tìm và xử lý tất cả file theo cấu hình.",
      },
      {
        question:
          "Khái niệm 'Transpiler' (như TypeScript) khác gì 'Compiler' truyền thống?",
        options: [
          "Dịch từ ngôn ngữ bậc cao sang mã máy",
          "Dịch từ ngôn ngữ bậc cao này sang ngôn ngữ khác",
          "Nó không kiểm tra lỗi",
          "Nó chỉ chạy trên Linux",
        ],
        correct: 1,
        explanation:
          "Transpiler dịch mã nguồn (TS) sang mã nguồn khác (JS) thay vì mã máy (binary).",
      },
      {
        question:
          "Có thể sử dụng các thư viện JavaScript có sẵn trong dự án TypeScript không?",
        options: [
          "Không, phải viết lại bằng TypeScript",
          "Có, hoàn toàn tương thích",
          "Chỉ các thư viện của Microsoft",
          "Được nhưng sẽ bị chậm hơn",
        ],
        correct: 1,
        explanation:
          "Có thể dùng trực tiếp hoặc cài thêm Type Definitions (@types) để có hỗ trợ nhắc lệnh tốt hơn.",
      },
    ],
  },
  {
    id: "basics",
    title: "2. Các kiểu dữ liệu cơ bản",
    description: "Làm quen với string, number, boolean, array và any.",
    content: [
      {
        type: "text",
        value:
          "**1. Type Annotation (Chú thích kiểu):**\nTrong TypeScript, chúng ta quy định kiểu dữ liệu cho biến bằng cách sử dụng dấu hai chấm `:` theo sau là tên kiểu. Nếu bạn gán sai kiểu, trình biên dịch sẽ báo lỗi ngay lập tức.",
      },
      {
        type: "code",
        lang: "typescript",
        title: "Kiểu nguyên thủy (Primitive Types)",
        value: `// Boolean
let isDone: boolean = false;

// Number (hỗ trợ cả số nguyên và số thực)
let decimal: number = 6;
let float: number = 3.14;

// String (Chuỗi ký tự)
let color: string = "blue";
let message: string = \`Hello, my favorite color is \${color}\`; // Template String`,
      },
      {
        type: "text",
        value:
          "**2. Array (Mảng):**\nCó hai cách chính để khai báo mảng trong TypeScript. Cách 1 dùng cú pháp `type[]`, cách 2 dùng Generic `Array<type>`.",
      },
      {
        type: "code",
        lang: "typescript",
        title: "Khai báo Mảng",
        value: `// Cách 1: Phổ biến nhất
let list: number[] = [1, 2, 3];

// Cách 2: Sử dụng Array Generic
let listGeneric: Array<number> = [1, 2, 3];

// Mảng hỗn hợp (Union Type)
let mixed: (string | number)[] = ["text", 1, 5, "hello"];`,
      },
      {
        type: "text",
        value:
          "**3. Kiểu `any`:**\nĐôi khi bạn không biết trước kiểu dữ liệu (ví dụ: dữ liệu từ API hoặc thư viện bên thứ 3). Lúc này ta dùng `any`. Tuy nhiên, **hạn chế tối đa** việc dùng `any` vì nó sẽ tắt tính năng kiểm tra an toàn của TypeScript.",
      },
      {
        type: "code",
        lang: "typescript",
        title: "Sử dụng Any",
        value: `let notSure: any = 4;
notSure = "maybe a string instead"; // OK
notSure = false; // OK - không báo lỗi`,
      },
      {
        type: "note",
        value:
          "Mẹo: Nếu bạn lười khai báo, TypeScript có tính năng **Type Inference** (Tự suy luận kiểu). Ví dụ: `let x = 10;` TS sẽ tự hiểu `x` là `number`.",
      },
    ],
    quiz: [
      {
        question: "Cách khai báo mảng số nguyên nào là ĐÚNG?",
        options: [
          "let arr: number = [1,2,3]",
          "let arr: number[] = [1,2,3]",
          "let arr = {number: [1,2,3]}",
          "let arr: array = [1,2,3]",
        ],
        correct: 1,
        explanation:
          "Cú pháp chuẩn là `Type[]` hoặc `Array<Type>`. Ở đây `number[]` là đúng.",
      },
      {
        question: "Đoạn code: `let x: string = 10;` sẽ gây ra lỗi gì?",
        options: [
          "Không có lỗi",
          "Lỗi Runtime",
          "Lỗi biên dịch (Compile error)",
          "Lỗi logic",
        ],
        correct: 2,
        explanation:
          "TypeScript sẽ báo lỗi ngay lúc biên dịch vì bạn đang gán số (number) cho biến kiểu chuỗi (string).",
      },
      {
        question: "Từ khóa nào dùng để định nghĩa một Interface?",
        options: ["type", "class", "interface", "struct"],
        correct: 2,
        explanation:
          "Từ khóa `interface` được dùng để định nghĩa cấu trúc (hình dáng) của một object.",
      },
      {
        question:
          "Dấu `?` trong khai báo Interface (ví dụ: `age?: number`) có ý nghĩa gì?",
        options: [
          "Thuộc tính đó là bắt buộc",
          "Thuộc tính đó không bắt buộc (optional)",
          "Thuộc tính đó có thể là null",
          "Thuộc tính đó là private",
        ],
        correct: 1,
        explanation:
          "Dấu `?` đánh dấu một thuộc tính là tùy chọn (optional), nghĩa là object có thể có hoặc không có thuộc tính này.",
      },
      {
        question:
          "Nếu muốn khai báo một mảng chứa cả chuỗi và số, cú pháp nào đúng?",
        options: [
          "let arr: [string, number] = []",
          "let arr: string | number[] = []",
          "let arr: (string | number)[] = []",
          "let arr: any[] = []",
        ],
        correct: 2,
        explanation:
          "`Array<string | number>` hoặc `(string | number)[]` là cú pháp đúng để khai báo mảng hỗn hợp (Union Type).",
      },
      {
        question:
          "Tính năng 'Type Inference' (Suy luận kiểu) hoạt động như thế nào?",
        options: [
          "Bạn luôn phải khai báo kiểu dữ liệu thủ công",
          "TypeScript tự động đoán kiểu dữ liệu dựa trên giá trị khởi tạo",
          "TypeScript chuyển mọi biến thành kiểu any",
          "Nó chỉ hoạt động với kiểu string",
        ],
        correct: 1,
        explanation:
          "Nếu bạn không khai báo kiểu (ví dụ `let x = 10`), TypeScript sẽ tự động hiểu `x` là `number` dựa trên giá trị 10.",
      },
      {
        question:
          "Thuộc tính `readonly` trong Interface ngăn chặn hành động nào?",
        options: [
          "Đọc giá trị của thuộc tính",
          "Gán lại giá trị mới cho thuộc tính sau khi khởi tạo",
          "Xóa thuộc tính khỏi object",
          "Copy object sang object khác",
        ],
        correct: 1,
        explanation:
          "`readonly` làm cho thuộc tính trở thành hằng số trong ngữ cảnh của object đó, không thể bị gán lại (`=`) sau khi object đã tạo.",
      },
      {
        question: "Kiểu dữ liệu `any` nên được sử dụng khi nào?",
        options: [
          "Luôn luôn sử dụng để code nhanh hơn",
          "Khi muốn tắt tính năng kiểm tra lỗi của TypeScript",
          "Khi không biết trước kiểu dữ liệu (ví dụ từ thư viện thứ 3) và không thể xác định type",
          "Thay thế cho kiểu string",
        ],
        correct: 2,
        explanation:
          "Chỉ nên dùng `any` khi thực sự cần thiết hoặc đang migrate code, vì nó làm mất đi lợi ích an toàn kiểu của TypeScript.",
      },
      {
        question:
          "Để kế thừa các thuộc tính từ Interface khác, ta dùng từ khóa nào?",
        options: ["implements", "extends", "inherits", "super"],
        correct: 1,
        explanation:
          "Interface sử dụng từ khóa `extends` để kế thừa từ một hoặc nhiều interface khác.",
      },
      {
        question:
          "Sau khi biên dịch sang JavaScript, các Interface sẽ trở thành gì?",
        options: [
          "Chúng biến thành class JavaScript",
          "Chúng biến thành Object JavaScript",
          "Chúng biến thành JSON",
          "Chúng bị loại bỏ hoàn toàn",
        ],
        correct: 3,
        explanation:
          "Interface là tính năng chỉ có ở TypeScript (compile-time). Nó hoàn toàn bị xóa bỏ trong file JavaScript kết quả.",
      },
      {
        question: "Cú pháp Generic để khai báo mảng số là gì?",
        options: [
          "Array[number]",
          "Array<number>",
          "List<number>",
          "number<Array>",
        ],
        correct: 1,
        explanation:
          "`Array<type>` là cú pháp Generic tương đương với `type[]`.",
      },
      {
        question:
          "Đoạn code sau có hợp lệ không? `const list: number[] = [1, '2', 3];`",
        options: [
          "Có, TypeScript tự chuyển chuỗi thành số",
          "Không, lỗi vì mảng chỉ được chứa số",
          "Có, vì JavaScript cho phép mảng hỗn hợp",
          "Không, lỗi cú pháp thiếu dấu chấm phẩy",
        ],
        correct: 1,
        explanation:
          "Mảng được khai báo là `number[]` thì không thể chứa chuỗi `'2'`.",
      },
      {
        question: "Ký tự nào dùng để phân cách tên biến và kiểu dữ liệu?",
        options: [
          "Dấu bằng (=)",
          "Dấu mũi tên (->)",
          "Dấu hai chấm (:)",
          "Dấu chấm (.)",
        ],
        correct: 2,
        explanation:
          "Cú pháp TypeScript sử dụng dấu hai chấm, ví dụ: `let name: string`.",
      },
      {
        question:
          "Template String (chuỗi nội suy) trong TypeScript dùng ký tự nào bao quanh?",
        options: [
          "Dấu nháy đơn (')",
          'Dấu nháy kép (")',
          "Dấu backtick (`)",
          "Dấu ngoặc đơn ()",
        ],
        correct: 2,
        explanation:
          "Dấu backtick (`) cho phép chèn biến vào chuỗi bằng cú pháp `${bien}`.",
      },
      {
        question:
          "Trong Interface, nếu một object thiếu một thuộc tính bắt buộc (không có `?`), điều gì xảy ra?",
        options: [
          "Trình biên dịch báo lỗi",
          "Thuộc tính đó tự động nhận giá trị null",
          "Thuộc tính đó tự động nhận giá trị undefined",
          "Không có lỗi gì",
        ],
        correct: 0,
        explanation:
          "Object phải tuân thủ đúng 'hợp đồng' của Interface, thiếu thuộc tính bắt buộc sẽ gây lỗi biên dịch.",
      },
      {
        question: "Kiểu dữ liệu `void` thường dùng cho trường hợp nào?",
        options: [
          "Biến chứa giá trị null",
          "Hàm không trả về giá trị nào",
          "Mảng rỗng",
          "Object không có thuộc tính",
        ],
        correct: 1,
        explanation:
          "`void` được dùng làm kiểu trả về cho các hàm thực hiện hành động mà không return dữ liệu.",
      },
      {
        question:
          "Cho `interface Point { x: number; y: number; }`. Object nào sau đây hợp lệ?",
        options: [
          "{ x: 10 }",
          "{ x: 10, y: '20' }",
          "{ x: 10, y: 20 }",
          "{ x: 10, y: 20, z: 30 }",
        ],
        correct: 2,
        explanation:
          "Object phải có đủ `x` và `y` là number. Các phương án khác thiếu, sai kiểu hoặc thừa thuộc tính (khi gán trực tiếp).",
      },
      {
        question:
          "Giá trị `undefined` trong TypeScript có phải là một kiểu dữ liệu không?",
        options: [
          "Không, nó là lỗi",
          "Có, `undefined` là một kiểu",
          "Nó giống hệt `null`",
          "Nó là kiểu `string`",
        ],
        correct: 1,
        explanation:
          "Trong TypeScript, `undefined` và `null` thực sự là các kiểu dữ liệu riêng biệt.",
      },
      {
        question:
          "Hành động nào sau đây bị cấm với biến `const` nhưng có thể làm với thuộc tính `readonly`?",
        options: [
          "Không có, cả hai đều ngăn gán lại giá trị",
          "Readonly dùng cho thuộc tính object, const dùng cho biến",
          "Const có thể thay đổi, readonly thì không",
          "Readonly chỉ dùng cho class",
        ],
        correct: 1,
        explanation:
          "Về bản chất, `const` dùng cho biến, `readonly` dùng cho thuộc tính (property) của interface/class. Cả hai đều ngăn gán lại.",
      },
      {
        question:
          "Làm thế nào để khai báo một biến có thể là `string` HOẶC `null`?",
        options: [
          "let x: string && null;",
          "let x: string || null;",
          "let x: string | null;",
          "let x: string & null;",
        ],
        correct: 2,
        explanation:
          "Dấu gạch đứng `|` biểu thị Union Type (hoặc kiểu này hoặc kiểu kia).",
      },
    ],
  },
  {
    id: "interfaces",
    title: "3. Interface & Object Type",
    description:
      "Định nghĩa cấu trúc cho Object, tính kế thừa và các thuộc tính nâng cao.",
    content: [
      {
        type: "text",
        value:
          "<strong>1. Interface là gì?</strong>\nInterface (Giao diện) trong TypeScript là một bản thiết kế (blueprint) quy định cấu trúc của một Object. Nó không tồn tại khi code được biên dịch sang JavaScript (runtime), mà chỉ giúp kiểm tra lỗi trong quá trình phát triển (compile-time).",
      },
      {
        type: "code",
        lang: "typescript",
        title: "Cú pháp cơ bản, Optional (?) & Readonly",
        value: `interface User {
  id: number;
  name: string;
  email?: string; // (?) Không bắt buộc, có thể là string hoặc undefined
  readonly role: string; // (readonly) Chỉ đọc, không thể sửa sau khi gán
}

const u1: User = {
  id: 1,
  name: "Nam",
  role: "Admin"
};

u1.name = "Bình"; // OK
// u1.role = "User"; // Lỗi! Không được sửa thuộc tính readonly`,
      },
      {
        type: "text",
        value:
          "<strong>2. Kế thừa Interface (Extends)</strong>\nInterface có thể kế thừa từ một hoặc nhiều interface khác bằng từ khóa `extends`. Điều này giúp tái sử dụng code và tổ chức dữ liệu gọn gàng hơn.",
      },
      {
        type: "code",
        lang: "typescript",
        title: "Ví dụ về Extends",
        value: `interface Animal {
  name: string;
}

interface CanFly {
  fly(): void;
}

// Kế thừa từ nhiều interface
interface Bird extends Animal, CanFly {
  featherColor: string;
}

const parrot: Bird = {
  name: "Vẹt",
  featherColor: "Xanh",
  fly() { console.log("Đang bay..."); }
};`,
      },
      {
        type: "text",
        value:
          "<strong>3. Index Signatures</strong>\nKhi bạn không biết trước tên chính xác của các thuộc tính nhưng biết kiểu dữ liệu của chúng, hãy dùng Index Signature.",
      },
      {
        type: "code",
        lang: "typescript",
        title: "Ví dụ Index Signature",
        value: `interface StringArray {
  [index: number]: string; 
}

const myArray: StringArray = ["Bob", "Fred"];
const myStr: string = myArray[0];`,
      },
    ],
    quiz: [
      {
        question:
          "Dấu `?` trong interface (ví dụ `age?: number`) có ý nghĩa gì?",
        options: [
          "Biến đó là kiểu boolean",
          "Biến đó không xác định",
          "Thuộc tính đó là tùy chọn (optional)",
          "Thuộc tính đó là bắt buộc",
        ],
        correct: 2,
        explanation:
          "`prop?: type` nghĩa là thuộc tính đó có thể có hoặc không có trong object. Nếu không có, giá trị là undefined.",
      },
      {
        question: "Thuộc tính `readonly` làm gì?",
        options: [
          "Chỉ cho phép đọc, không cho phép gán lại",
          "Làm ẩn thuộc tính",
          "Chỉ cho admin xem",
          "Tự động xóa sau khi đọc",
        ],
        correct: 0,
        explanation:
          "`readonly` ngăn chặn việc gán lại giá trị cho thuộc tính sau khi object đã được khởi tạo lần đầu.",
      },
      {
        question: "Từ khóa nào dùng để khai báo một Interface?",
        options: ["type", "struct", "interface", "class"],
        correct: 2,
        explanation:
          "Trong TypeScript, từ khóa `interface` được dùng để định nghĩa cấu trúc của object.",
      },
      {
        question:
          "Interface có tồn tại trong file JavaScript sau khi biên dịch không?",
        options: [
          "Có, nó biến thành Class",
          "Có, nó biến thành Object JSON",
          "Không, nó bị xóa hoàn toàn",
          "Có, nhưng bị ẩn đi",
        ],
        correct: 2,
        explanation:
          "Interface là tính năng chỉ có ở TypeScript (compile-time) và sẽ bị loại bỏ hoàn toàn khi build ra JS.",
      },
      {
        question:
          "Nếu object thiếu một thuộc tính bắt buộc được định nghĩa trong Interface, điều gì xảy ra?",
        options: [
          "Trình biên dịch báo lỗi",
          "Chương trình tự thêm thuộc tính đó với giá trị null",
          "Chương trình chạy bình thường",
          "Thuộc tính đó được bỏ qua",
        ],
        correct: 0,
        explanation:
          "TypeScript kiểm tra chặt chẽ, nếu thiếu thuộc tính bắt buộc, nó sẽ báo lỗi ngay lập tức.",
      },
      {
        question:
          "Từ khóa nào dùng để một Interface kế thừa một Interface khác?",
        options: ["implements", "inherits", "super", "extends"],
        correct: 3,
        explanation:
          "Sử dụng `extends` để kế thừa. Ví dụ: `interface Cat extends Animal`.",
      },
      {
        question: "Một Interface có thể kế thừa từ bao nhiêu Interface khác?",
        options: [
          "Chỉ 1",
          "Tối đa 2",
          "Nhiều interface (cách nhau bởi dấu phẩy)",
          "Không thể kế thừa",
        ],
        correct: 2,
        explanation:
          "TypeScript hỗ trợ đa kế thừa interface, ví dụ: `interface C extends A, B`.",
      },
      {
        question:
          "Cách đặt tên Interface nào là chuẩn mực (Naming Convention)?",
        options: [
          "camelCase (userProfile)",
          "PascalCase (UserProfile)",
          "snake_case (user_profile)",
          "UPPERCASE (USERPROFILE)",
        ],
        correct: 1,
        explanation:
          "Tên Interface thường được viết hoa chữ cái đầu mỗi từ (PascalCase), ví dụ `User`, `ProductItem`.",
      },
      {
        question:
          "Interface có thể dùng để định nghĩa kiểu cho Function không?",
        options: [
          "Có",
          "Không, chỉ dùng cho Object",
          "Không, chỉ dùng cho Class",
          "Chỉ dùng cho Arrow Function",
        ],
        correct: 0,
        explanation:
          "Interface có thể mô tả Function types. Ví dụ: `interface SearchFunc { (source: string): boolean; }`.",
      },
      {
        question: "Sự khác biệt chính giữa `readonly` và `const` là gì?",
        options: [
          "Giống hệt nhau",
          "`const` dùng cho biến, `readonly` dùng cho thuộc tính",
          "`const` dùng cho số, `readonly` dùng cho chuỗi",
          "`readonly` mạnh hơn `const`",
        ],
        correct: 1,
        explanation:
          "Sử dụng `const` khi khai báo biến, và `readonly` khi khai báo thuộc tính trong Interface/Class.",
      },
      {
        question:
          "Đoạn code: `interface A { x: number }; interface A { y: number };` có hợp lệ không?",
        options: [
          "Lỗi trùng tên",
          "Hợp lệ, TypeScript sẽ gộp (merge) 2 interface lại",
          "Interface sau sẽ ghi đè interface trước",
          "Lỗi cú pháp",
        ],
        correct: 1,
        explanation:
          "Đây là tính năng 'Declaration Merging'. Interface A cuối cùng sẽ có cả `x` và `y`.",
      },
      {
        question: "Class sử dụng Interface thông qua từ khóa nào?",
        options: ["extends", "uses", "implements", "imports"],
        correct: 2,
        explanation:
          "Class cam kết tuân thủ Interface bằng từ khóa `implements`. Ví dụ: `class User implements IUser`.",
      },
      {
        question: "Index Signature `[key: string]: any` có ý nghĩa gì?",
        options: [
          "Object chỉ được chứa key là chuỗi 'key'",
          "Object có thể chứa bất kỳ key nào là string và giá trị bất kỳ",
          "Object rỗng",
          "Object bị lỗi",
        ],
        correct: 1,
        explanation:
          "Nó cho phép object có thêm các thuộc tính mở rộng mà không cần khai báo tên cụ thể trước.",
      },
      {
        question: "Lỗi `Excess Property Checks` xảy ra khi nào?",
        options: [
          "Khi object thiếu thuộc tính",
          "Khi gán trực tiếp object literal có thừa thuộc tính không khai báo trong interface",
          "Khi dùng readonly",
          "Khi đặt tên sai quy tắc",
        ],
        correct: 1,
        explanation:
          "Nếu bạn gán `{x: 1, z: 2}` vào kiểu `{x: number}`, TS sẽ báo lỗi vì thừa `z`.",
      },
      {
        question:
          "Nếu thuộc tính `email` là optional (`email?: string`), giá trị của nó khi truy cập mà chưa gán là gì?",
        options: ["null", "string rỗng", "undefined", "0"],
        correct: 2,
        explanation:
          "Trong JS/TS, truy cập thuộc tính chưa được định nghĩa hoặc optional mà không có giá trị sẽ trả về `undefined`.",
      },
      {
        question: "Có thể lồng Interface bên trong một Interface khác không?",
        options: [
          "Không",
          "Có, thuộc tính của Interface này có thể là kiểu của Interface kia",
          "Chỉ lồng được 1 cấp",
          "Chỉ lồng được nếu dùng class",
        ],
        correct: 1,
        explanation:
          "Ví dụ: Interface `Car` có thuộc tính `engine` mang kiểu Interface `Engine`.",
      },
      {
        question:
          "Tính năng 'Duck Typing' (hoặc Structural Typing) trong TS nghĩa là gì?",
        options: [
          "Phải đúng tên class mới gán được",
          "Chỉ cần cấu trúc (hình dáng) khớp nhau là hợp lệ, không quan tâm tên type",
          "Code giống con vịt",
          "Biến đổi kiểu tự động",
        ],
        correct: 1,
        explanation:
          "Nếu object A có đủ các thuộc tính mà Interface B yêu cầu, TS coi A là kiểu B.",
      },
      {
        question:
          "Để định nghĩa một mảng string bằng Interface, cách nào đúng?",
        options: [
          "interface StringArray { [index: number]: string; }",
          "interface StringArray { length: 10 }",
          "interface StringArray extends Array {}",
          "interface StringArray { key: string }",
        ],
        correct: 0,
        explanation: "Đây là cách định nghĩa Indexable Types cho mảng.",
      },
      {
        question: "Sự khác nhau cơ bản giữa Interface và Type Alias?",
        options: [
          "Interface không thể mô tả object",
          "Type Alias không thể dùng `implements`",
          "Interface có thể gộp (merge), Type thì không",
          "Không có gì khác nhau",
        ],
        correct: 2,
        explanation:
          "Interface hỗ trợ Declaration Merging (khai báo trùng tên tự gộp), còn Type Alias sẽ báo lỗi trùng tên.",
      },
      {
        question: "Mục đích chính của Interface là gì?",
        options: [
          "Tạo ra code chạy nhanh hơn",
          "Đảm bảo tính nhất quán và kiểm soát cấu trúc dữ liệu",
          "Mã hóa dữ liệu",
          "Kết nối Database",
        ],
        correct: 1,
        explanation:
          "Interface giúp define 'contract' (hợp đồng) cho dữ liệu, giúp team làm việc thống nhất và tránh lỗi sai cấu trúc.",
      },
    ],
  },
  {
    id: "functions",
    title: "4. Functions (Hàm)",
    description: "Định nghĩa kiểu cho tham số và giá trị trả về.",
    content: [
      {
        type: "text",
        value:
          "Bạn có thể định nghĩa kiểu cho từng tham số đầu vào và kiểu dữ liệu mà hàm sẽ trả về.",
      },
      {
        type: "code",
        lang: "typescript",
        title: "Ví dụ hàm",
        value: `function add(x: number, y: number): number {
  return x + y;
}

// Arrow function
const multiply = (x: number, y: number): number => x * y;

// Hàm không trả về gì (void)
const logMsg = (msg: string): void => {
  console.log(msg);
}`,
      },
    ],
    quiz: [
      {
        question: "Kiểu trả về `void` nghĩa là gì?",
        options: [
          "Trả về null",
          "Trả về undefined",
          "Không trả về giá trị nào",
          "Trả về lỗi",
        ],
        correct: 2,
        explanation:
          "`void` được dùng khi hàm thực hiện hành động nhưng không return giá trị nào.",
      },
      {
        question: "Khai báo nào đúng cho hàm nhận vào string trả về number?",
        options: [
          "func(s: string): number",
          "func(s: number): string",
          "func(s): int",
          "func: string -> number",
        ],
        correct: 0,
        explanation: "Cú pháp: `tên_hàm(tham_số: kiểu): kiểu_trả_về`.",
      },
    ],
  },
  {
    id: "generics",
    title: "5. Generics (Nâng cao)",
    description: "Viết code tái sử dụng linh hoạt.",
    content: [
      {
        type: "text",
        value:
          'Generics cho phép tạo ra các component/hàm có thể làm việc với nhiều kiểu dữ liệu khác nhau mà vẫn giữ được tính an toàn kiểu (type safety). Hãy nghĩ nó như một "biến" dành cho các kiểu dữ liệu.',
      },
      {
        type: "code",
        lang: "typescript",
        title: "Ví dụ Generics",
        value: `// Hàm identity nhận vào T và trả về T
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString"); // T là string
let output2 = identity<number>(100);       // T là number`,
      },
    ],
    quiz: [
      {
        question: "Ký tự nào thường được dùng đại diện cho Generics?",
        options: ["X", "G", "T", "Any"],
        correct: 2,
        explanation:
          "`T` (Type) là quy ước phổ biến nhất, mặc dù bạn có thể dùng bất kỳ tên nào.",
      },
      {
        question: "Lợi ích lớn nhất của Generics là gì?",
        options: [
          "Chạy nhanh hơn",
          "Tái sử dụng code an toàn kiểu",
          "Giảm dung lượng file",
          "Bắt buộc dùng any",
        ],
        correct: 1,
        explanation:
          "Generics giúp viết code một lần dùng cho nhiều kiểu mà không phải hy sinh tính năng kiểm tra kiểu như khi dùng `any`.",
      },
    ],
  },
];
export default curriculum;
