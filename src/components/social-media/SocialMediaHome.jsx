import React, { useState, useRef, useEffect } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  MoreHorizontal,
  Send,
  BookOpen,
  Search,
  Bell,
  Menu,
  ArrowLeft,
} from "lucide-react";

// --- MOCK DATA ---
const CURRENT_USER = {
  id: "u-me",
  name: "Học Viên Xuất Sắc",
  avatar:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4",
  role: "Người dùng",
};

const MOCK_USERS = [
  CURRENT_USER,
  {
    id: "u-1",
    name: "Cô giáo Thảo",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&backgroundColor=ffdfbf",
    role: "Giáo viên Tiếng Anh",
  },
  {
    id: "u-2",
    name: "Trần Văn Đạt",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Dat&backgroundColor=c0aede",
    role: "Sinh viên IT",
  },
  {
    id: "u-3",
    name: "Lê Mai Chi",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Chi&backgroundColor=ffb6b9",
    role: "Học sinh",
  },
];

const INITIAL_POSTS = [
  {
    id: "p1",
    author: MOCK_USERS[1], // Cô giáo Thảo
    content:
      "Hôm nay chúng ta ôn lại từ vựng chủ đề Động vật nhé! 🐘\n- Elephant (Con voi) - /ˈelɪfənt/\n- Tiger (Con hổ) - /ˈtaɪɡər/\n\nCác bạn có nhớ ví dụ câu cho 2 từ này không? Bình luận bên dưới nhé!",
    timestamp: "2 giờ trước",
    reactions: { "👍": 15, "❤️": 8, "💡": 12 },
    userReacted: "❤️",
    comments: [
      {
        id: "c1",
        author: "Tuấn Anh",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tuan",
        content: "The elephant is the largest land animal ạ!",
        timestamp: "1 giờ trước",
      },
    ],
  },
  {
    id: "p2",
    author: MOCK_USERS[2], // Trần Văn Đạt
    content:
      "Mình đang tìm hiểu về thuật toán sắp xếp. Có ai có tài liệu hay video nào giải thích dễ hiểu về Quick Sort không cho mình xin với. Đọc wiki thấy hơi lú 😅",
    timestamp: "5 giờ trước",
    reactions: { "👍": 5, "💡": 2 },
    userReacted: null,
    comments: [
      {
        id: "c2",
        author: "Hoàng Minh",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minh",
        content:
          'Bạn lên Youtube gõ "Quick Sort visualized" xem trực quan dễ hiểu lắm.',
        timestamp: "4 giờ trước",
      },
    ],
  },
  {
    id: "p3",
    author: MOCK_USERS[3], // Lê Mai Chi
    content:
      "Theo mọi người, để xây dựng một thói quen tốt thì yếu tố nào là quan trọng nhất? Sự kỷ luật, môi trường hay động lực ban đầu?",
    timestamp: "1 ngày trước",
    reactions: { "❤️": 24, "💡": 45 },
    userReacted: "💡",
    comments: [],
  },
];

const EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "💡"];

export default function SocialLearningApp() {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Navigation & View State
  const [currentView, setCurrentView] = useState("feed"); // 'feed' | 'profile'
  const [viewedUser, setViewedUser] = useState(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // --- HANDLERS ---
  const handleCreatePost = (content) => {
    if (!content.trim()) return;

    const newPost = {
      id: `p-${Date.now()}`,
      author: CURRENT_USER,
      content: content,
      timestamp: "Vừa xong",
      reactions: {},
      userReacted: null,
      comments: [],
    };

    setPosts([newPost, ...posts]);
  };

  const handleReact = (postId, emoji) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          const newReactions = { ...post.reactions };
          let newUserReacted = post.userReacted;

          if (post.userReacted === emoji) {
            newReactions[emoji]--;
            if (newReactions[emoji] === 0) delete newReactions[emoji];
            newUserReacted = null;
          } else {
            if (post.userReacted) {
              newReactions[post.userReacted]--;
              if (newReactions[post.userReacted] === 0)
                delete newReactions[post.userReacted];
            }
            newReactions[emoji] = (newReactions[emoji] || 0) + 1;
            newUserReacted = emoji;
          }

          return {
            ...post,
            reactions: newReactions,
            userReacted: newUserReacted,
          };
        }
        return post;
      }),
    );
  };

  const handleAddComment = (postId, commentContent) => {
    if (!commentContent.trim()) return;

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: CURRENT_USER.name,
            avatar: CURRENT_USER.avatar,
            content: commentContent,
            timestamp: "Vừa xong",
          };
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      }),
    );
  };

  // --- NAVIGATION HANDLERS ---
  const goToProfile = (user) => {
    setViewedUser(user);
    setCurrentView("profile");
    setSearchQuery("");
    setShowSearchResults(false);
    window.scrollTo(0, 0);
  };

  const goToFeed = () => {
    setCurrentView("feed");
    setViewedUser(null);
    setSearchQuery("");
    setShowSearchResults(false);
    window.scrollTo(0, 0);
  };

  // --- SEARCH LOGIC ---
  const filteredUsers = MOCK_USERS.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // --- RENDER HELPERS ---
  const displayedPosts =
    currentView === "profile" && viewedUser
      ? posts.filter((post) => post.author.id === viewedUser.id)
      : posts;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 text-indigo-600 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={goToFeed}
          >
            <BookOpen size={28} strokeWidth={2.5} />
            <span className="text-xl font-bold hidden sm:block">
              EduConnect
            </span>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block relative">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                onBlur={() =>
                  setTimeout(() => setShowSearchResults(false), 200)
                }
                className="w-full bg-slate-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => goToProfile(user)}
                      className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-100 last:border-0"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full bg-slate-100"
                      />
                      <div>
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.role}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-slate-500">
                    Không tìm thấy người dùng nào.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div
              className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all"
              onClick={() => goToProfile(CURRENT_USER)}
            >
              <img
                src={CURRENT_USER.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto w-full pt-6 pb-20 px-4 sm:px-0">
        {/* Conditional Rendering based on View */}
        {currentView === "profile" && viewedUser ? (
          <div className="mb-6 animate-in fade-in slide-in-from-bottom-4">
            <button
              onClick={goToFeed}
              className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft size={16} />
              Quay lại bảng tin
            </button>
            <ProfileHeader
              user={viewedUser}
              postCount={displayedPosts.length}
            />
          </div>
        ) : (
          <div className="mb-6">
            <CreatePost onPost={handleCreatePost} currentUser={CURRENT_USER} />
          </div>
        )}

        {/* Feed - List of Posts */}
        <div className="space-y-6">
          {displayedPosts.length > 0 ? (
            displayedPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onReact={handleReact}
                onComment={handleAddComment}
                onUserClick={goToProfile}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-slate-200 shadow-sm text-slate-500">
              Chưa có bài viết nào.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- SUB COMPONENTS ---

function ProfileHeader({ user, postCount }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-indigo-300 to-purple-400 w-full"></div>

      {/* Profile Info */}
      <div className="px-6 pb-6 relative">
        <div className="flex justify-between items-end -mt-12 mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-white bg-slate-100 shadow-sm"
          />
          {user.id !== CURRENT_USER.id && (
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors shadow-sm mb-2">
              Theo dõi
            </button>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
          <p className="text-slate-500 font-medium mb-3">{user.role}</p>

          <div className="flex gap-4 text-sm text-slate-600 border-t border-slate-100 pt-3">
            <div>
              <span className="font-bold text-slate-800">{postCount}</span> bài
              viết
            </div>
            <div>
              <span className="font-bold text-slate-800">120</span> người theo
              dõi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatePost({ onPost, currentUser }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    onPost(content);
    setContent("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex gap-3">
        <img
          src={currentUser.avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Bạn muốn chia sẻ kiến thức gì hôm nay?"
            className="w-full bg-slate-100/50 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 min-h-[80px] text-[15px]"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        <button className="flex items-center gap-2 text-slate-500 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium">
          <ImageIcon size={18} className="text-emerald-500" />
          <span className="hidden sm:inline">Thêm ảnh</span>
        </button>
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
        >
          <span>Đăng bài</span>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

function Post({ post, onReact, onComment, onUserClick }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  const totalReactions = Object.values(post.reactions).reduce(
    (a, b) => a + b,
    0,
  );
  const reactionEntries = Object.entries(post.reactions).sort(
    (a, b) => b[1] - a[1],
  );

  const submitComment = (e) => {
    e.preventDefault();
    onComment(post.id, commentText);
    setCommentText("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-visible">
      {/* Post Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            onClick={() => onUserClick && onUserClick(post.author)}
            className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
          />
          <div>
            <h3
              className="font-semibold text-[15px] flex items-center gap-1 cursor-pointer hover:underline hover:text-indigo-600"
              onClick={() => onUserClick && onUserClick(post.author)}
            >
              {post.author.name}
            </h3>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <span>{post.timestamp}</span>
              <span>•</span>
              <span>{post.author.role}</span>
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:bg-slate-100 p-1.5 rounded-full transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Stats (Reactions & Comments Count) */}
      {(totalReactions > 0 || post.comments.length > 0) && (
        <div className="px-4 py-2 flex items-center justify-between text-sm text-slate-500 border-b border-slate-100">
          <div className="flex items-center gap-1">
            {totalReactions > 0 && (
              <>
                <div className="flex -space-x-1">
                  {reactionEntries.slice(0, 3).map(([emoji]) => (
                    <span
                      key={emoji}
                      className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-xs ring-2 ring-white z-10"
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
                <span className="ml-1.5">{totalReactions}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            {post.comments.length > 0 && (
              <button
                onClick={() => setShowComments(!showComments)}
                className="hover:underline"
              >
                {post.comments.length} bình luận
              </button>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-2 py-1 flex items-center justify-between relative">
        {/* Reaction Picker Popover */}
        {showReactionPicker && (
          <div
            className="absolute bottom-full left-4 mb-2 bg-white rounded-full shadow-lg border border-slate-200 p-1.5 flex gap-1 z-20 animate-in fade-in slide-in-from-bottom-2"
            onMouseLeave={() => setShowReactionPicker(false)}
          >
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onReact(post.id, emoji);
                  setShowReactionPicker(false);
                }}
                className="w-10 h-10 hover:bg-slate-100 rounded-full flex items-center justify-center text-2xl transition-transform hover:scale-125 hover:-translate-y-1"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 flex justify-center">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors font-medium text-sm ${post.userReacted ? "text-indigo-600" : "text-slate-600 hover:bg-slate-50"}`}
            onMouseEnter={() => setShowReactionPicker(true)}
            onClick={() =>
              onReact(post.id, post.userReacted ? post.userReacted : "👍")
            }
          >
            {post.userReacted ? (
              <span className="text-xl leading-none mr-1">
                {post.userReacted}
              </span>
            ) : (
              <ThumbsUp
                size={18}
                className={post.userReacted ? "fill-current" : ""}
              />
            )}
            <span>{post.userReacted ? "Đã bày tỏ" : "Thích"}</span>
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium text-sm"
          >
            <MessageCircle size={18} />
            <span>Bình luận</span>
          </button>
        </div>

        <div className="flex-1 flex justify-center hidden sm:flex">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium text-sm">
            <Share2 size={18} />
            <span>Chia sẻ</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
          {/* List Comments */}
          <div className="space-y-4 mb-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <img
                  src={comment.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white"
                />
                <div className="flex-1">
                  <div className="bg-white p-2.5 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm inline-block">
                    <p className="font-semibold text-sm">{comment.author}</p>
                    <p className="text-[14px] mt-0.5">{comment.content}</p>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 ml-2 flex gap-3">
                    <button className="font-semibold hover:underline">
                      Thích
                    </button>
                    <span>{comment.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Input */}
          <div className="flex gap-2 mt-2">
            <img
              src={CURRENT_USER.avatar}
              alt="My Avatar"
              className="w-8 h-8 rounded-full border border-slate-200 bg-white"
            />
            <form onSubmit={submitComment} className="flex-1 relative">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Viết bình luận..."
                className="w-full bg-white border border-slate-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all shadow-sm"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-indigo-600 disabled:text-slate-300 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
