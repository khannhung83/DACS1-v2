// Hamburger Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    // Optional: Change hamburger icon to close icon
    const icon = menuToggle.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Mobile Dropdown Toggle (Add click listener for touch devices)
const dropdownParents = document.querySelectorAll(".nav-links .dropdown-parent");

dropdownParents.forEach(parent => {
  // Find the direct anchor link within the parent li
  const link = parent.querySelector("a");
  if (link) {
      link.addEventListener("click", (e) => {
          // Check if we are in mobile view (hamburger is visible)
          if (window.getComputedStyle(menuToggle).display !== "none") {
              // Prevent default link behavior only if it's just a dropdown trigger (#)
              if (link.getAttribute("href") === "#") {
                  e.preventDefault();
              }
              // Toggle "open" class on the parent li
              parent.classList.toggle("open");

              // Close other open dropdowns
              dropdownParents.forEach(otherParent => {
                  if (otherParent !== parent && otherParent.classList.contains("open")) {
                      otherParent.classList.remove("open");
                  }
              });
          }
      });
  }
});

// Close mobile menu/dropdowns if clicked outside
document.addEventListener("click", (e) => {
    if (navLinks && navLinks.classList.contains("active")) {
        // Check if the click is outside the navbar and the toggle button
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove("active");
            // Reset hamburger icon
            const icon = menuToggle.querySelector("i");
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
            // Close any open mobile dropdowns
            dropdownParents.forEach(parent => {
                parent.classList.remove("open");
            });
        }
    }
});

// --- Static Song Data for Search ---
const allSongsData = [
  // Album 1: Nhạc Trẻ Việt Hot
  { title: "3107", artist: "W/N, Nâu, Dươngg", albumId: "album_1", songId: "3107", imagePath: "assets/images/3107.png" },
  { title: "Em Gái Mưa", artist: "Hương Tràm", albumId: "album_1", songId: "em-gai-mua", imagePath: "assets/images/EmGaiMua.png" },
  { title: "Em Gì Ơi", artist: "Jack, K-ICM", albumId: "album_1", songId: "em-gi-oi", imagePath: "assets/images/EmGiOi.png" },
  { title: "Có Hẹn Với Thanh Xuân", artist: "MONSTAR", albumId: "album_1", songId: "co-hen-voi-thanh-xuan", imagePath: "assets/images/cohenvoithanhxuan.png" },
  { title: "Nàng Thơ", artist: "Hoàng Dũng", albumId: "album_1", songId: "nang-tho", imagePath: "assets/images/NangTho.png" },
  { title: "Sau Lưng Anh Có Ai Kìa", artist: "Thiều Bảo Trâm", albumId: "album_1", songId: "sau-lung-anh-co-ai-kia", imagePath: "assets/images/SauLungAnhCoAiKia.png" },
  { title: "Gửi Anh Xa Nhớ", artist: "Bích Phương", albumId: "album_1", songId: "gui-anh-xa-nho", imagePath: "assets/images/guianhxanho.png" },
  // Album 2: Nhạc Buồn
  { title: "Không Thể Cùng Nhau Suốt Kiếp", artist: "ERIK, Hòa Minzy", albumId: "album_2", songId: "khong-the-cung-nhau-suot-kiep", imagePath: "assets/images/KhongTheCungNhauSuotKiep.png" },
  { title: "Bức Tranh Từ Nước Mắt", artist: "Mr. Siro", albumId: "album_2", songId: "buc-tranh-tu-nuoc-mat", imagePath: "assets/images/BucTranhTuNuocMat.png" },
  { title: "Chiếc Khăn Gió Ấm", artist: "Thành Trung", albumId: "album_2", songId: "chiec-khan-gio-am", imagePath: "assets/images/ChiecKhanGioAm.png" },
  { title: "Có Chàng Trai Viết Lên Cây", artist: "Phan Mạnh Quỳnh", albumId: "album_2", songId: "co-chang-trai-viet-len-cay", imagePath: "assets/images/CoChangTraiVietLenCay.png" },
  { title: "Gác Lại Âu Lo", artist: "Da LAB, Miu Lê", albumId: "album_2", songId: "gac-lai-au-lo", imagePath: "assets/images/GacLaiAuLo.png" },
  { title: "Gửi Anh Xa Nhớ", artist: "Bích Phương", albumId: "album_2", songId: "gui-anh-xa-nho", imagePath: "assets/images/guianhxanho.png" }, // Duplicate song in this album
  // Album 3: Nhạc Trịnh
  { title: "Áo Lụa Hà Đông", artist: "Hoài Lâm", albumId: "album_3", songId: "ao-lua-ha-dong", imagePath: "assets/images/AoLuaHaDong.png" },
  { title: "Biển Nhớ", artist: "Hồng Nhung", albumId: "album_3", songId: "bien-nho", imagePath: "assets/images/BienNho.png" },
  { title: "Diễm Xưa", artist: "Lệ Quyên", albumId: "album_3", songId: "diem-xua", imagePath: "assets/images/DiemXua.png" },
  { title: "Cát Bụi", artist: "Quang Dũng, Hồng Nhung", albumId: "album_3", songId: "cat-bui", imagePath: "assets/images/CatBui.png" },
  { title: "Thành Phố Buồn", artist: "Đan Trường", albumId: "album_3", songId: "thanh-pho-buon", imagePath: "assets/images/ThanhPhoBuon.png" },
  { title: "Riêng Một Góc Trời", artist: "Tuấn Ngọc, Hoàng Dũng", albumId: "album_3", songId: "rieng-mot-goc-troi", imagePath: "assets/images/RiengMotGocTroi.png" },
  // Album 4: Nhạc Hoa Lời Việt
  { title: "Đại Thiên Bồng", artist: "Lý Viên Kiệt", albumId: "album_4", songId: "dai-thien-bong", imagePath: "assets/images/DaiThienBong.png" },
  { title: "Đánh Mất Em", artist: "Tỉnh Lung", albumId: "album_4", songId: "danh-mat-em", imagePath: "assets/images/DanhMatEm.png" },
  { title: "Đồng Miên", artist: "K.D", albumId: "album_4", songId: "dong-mien", imagePath: "assets/images/DongMien.png" },
  { title: "Một Đường Nở Hoa", artist: "Châu Thâm", albumId: "album_4", songId: "mot-duong-no-hoa", imagePath: "assets/images/MotDuongNoHoa.png" },
  { title: "Sứ Thanh Hoa", artist: "Châu Kiệt Luân", albumId: "album_4", songId: "su-thanh-hoa", imagePath: "assets/images/SuThanhHoa.png" },
  { title: "Thời Không Sai Lệch", artist: "Ngài Thần", albumId: "album_4", songId: "thoi-khong-sai-lech", imagePath: "assets/images/ThoiKhongSaiLech.png" },
  { title: "Người Kế Nhiệm", artist: "Nhâm Nhiên", albumId: "album_4", songId: "nguoi-ke-nhiem", imagePath: "assets/images/NguoiKeNhiem.png" },
  { title: "Phi Điểu Và Ve Sầu", artist: "Nhâm Nhiên", albumId: "album_4", songId: "phi-dieu-va-ve-sau", imagePath: "assets/images/PhiDieuVaVeSau.png" },
  { title: "Yên Vô Hiết", artist: "Tưởng Tuyết Nhi", albumId: "album_4", songId: "yen-vo-hiet", imagePath: "assets/images/YenVoHiet.png" },
  // Album 5: Nhạc Hoa Thịnh Hành
  { title: "Super Idol", artist: "A Tú", albumId: "album_5", songId: "super-idol", imagePath: "assets/images/SuperIdol.png" },
  { title: "Bạch Nguyệt Quang và Nốt Chu Sa (Cover)", artist: "K.D", albumId: "album_5", songId: "bach-nguyet-quang-va-not-chu-sa", imagePath: "assets/images/BachNguyetQuangVaNotChuSa.png" },
  { title: "Đại Thiên Bồng", artist: "Lý Viên Kiệt", albumId: "album_5", songId: "dai-thien-bong", imagePath: "assets/images/DaiThienBong.png" }, // Duplicate
  { title: "Đánh Mất Em", artist: "Tỉnh Lung", albumId: "album_5", songId: "danh-mat-em", imagePath: "assets/images/DanhMatEm.png" }, // Duplicate
  { title: "Đồng Miên", artist: "K.D", albumId: "album_5", songId: "dong-mien", imagePath: "assets/images/DongMien.png" }, // Duplicate
  { title: "Một Đường Nở Hoa", artist: "Châu Thâm", albumId: "album_5", songId: "mot-duong-no-hoa", imagePath: "assets/images/MotDuongNoHoa.png" }, // Duplicate
  // Album 6: Nhạc US-UK
  { title: "Shape of You", artist: "Ed Sheeran", albumId: "album_6", songId: "shape-of-you", imagePath: "assets/images/ShapeOfYou.png" },
  { title: "Despacito", artist: "Justin Bieber, Luis Fonsi", albumId: "album_6", songId: "despacito", imagePath: "assets/images/Despacito.png" },
  { title: "Sugar", artist: "Maroon 5", albumId: "album_6", songId: "sugar", imagePath: "assets/images/Sugar.png" },
  { title: "See You Again", artist: "Wiz Khalifa, Charlie Puth", albumId: "album_6", songId: "see-you-again", imagePath: "assets/images/SeeYouAgain.png" },
  // Album 7: Top Trending
  { title: "Chạy Ngay Đi", artist: "Sơn Tùng M-TP", albumId: "album_7", songId: "chay-ngay-di", imagePath: "assets/images/ChayNgayDi.png" },
  { title: "Hãy Trao Cho Anh", artist: "Sơn Tùng M-TP, Snoop Dogg", albumId: "album_7", songId: "hay-trao-cho-anh", imagePath: "assets/images/HayTraoChoAnh.png" },
  { title: "Sóng Gió", artist: "Jack, K-ICM", albumId: "album_7", songId: "song-gio", imagePath: "assets/images/SongGio.png" },
  { title: "Baby Shark Dance", artist: "Pinkfong", albumId: "album_7", songId: "baby-shark-dance", imagePath: "assets/images/BabyShark.png" },
  { title: "Gangnam Style", artist: "PSY", albumId: "album_7", songId: "gangnam-style", imagePath: "assets/images/GangnamStyle.png" },
  // Album 8: Lofi Chill
  { title: "3107 (Lofi Version)", artist: "W/N", albumId: "album_8", songId: "3107-lofi", imagePath: "assets/images/3107.png" },
  { title: "Đồng Miên", artist: "K.D", albumId: "album_8", songId: "dong-mien", imagePath: "assets/images/DongMien.png" }, // Duplicate
  { title: "Sứ Thanh Hoa", artist: "Châu Kiệt Luân", albumId: "album_8", songId: "su-thanh-hoa", imagePath: "assets/images/SuThanhHoa.png" }, // Duplicate
  { title: "Thời Không Sai Lệch", artist: "Ngài Thần", albumId: "album_8", songId: "thoi-khong-sai-lech", imagePath: "assets/images/ThoiKhongSaiLech.png" }, // Duplicate
  { title: "Người Kế Nhiệm", artist: "Nhâm Nhiên", albumId: "album_8", songId: "nguoi-ke-nhiem", imagePath: "assets/images/NguoiKeNhiem.png" }, // Duplicate
  { title: "Phi Điểu Và Ve Sầu", artist: "Nhâm Nhiên", albumId: "album_8", songId: "phi-dieu-va-ve-sau", imagePath: "assets/images/PhiDieuVaVeSau.png" } // Duplicate
];

// --- Search Functionality ---
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const resultsContainer = document.getElementById("search-results-container");
    const resultsList = document.getElementById("search-results-list");

    if (searchForm && searchInput && resultsContainer && resultsList) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page reload
            const query = searchInput.value.trim().toLowerCase();
            
            resultsList.innerHTML = ""; // Clear previous results

            if (query === "") {
                resultsContainer.style.display = "none"; // Hide if query is empty
                return;
            }

            const filteredSongs = allSongsData.filter(song => 
                song.title.toLowerCase().includes(query) || 
                song.artist.toLowerCase().includes(query)
            );

            if (filteredSongs.length > 0) {
                filteredSongs.forEach(song => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("album-item"); // Use album-item styling for consistency
                    
                    // Construct the link to the song page
                    const songLink = `html/song.html?album=${song.albumId}&song=${song.songId}`;
                    
                    resultItem.innerHTML = `
                        <a href="${songLink}">
                            <img src="${song.imagePath}" alt="${song.title}">
                            <div class="album-info">
                                <span class="album-title">${song.title}</span>
                                <span class="album-artist">${song.artist}</span>
                            </div>
                        </a>
                    `;
                    resultsList.appendChild(resultItem);
                });
                resultsContainer.style.display = "block"; // Show results container
            } else {
                resultsList.innerHTML = "<p>Không tìm thấy kết quả nào.</p>";
                resultsContainer.style.display = "block"; // Show container with 'no results' message
            }
        });
        
        // Optional: Clear results when input is cleared
        searchInput.addEventListener("input", () => {
            if (searchInput.value.trim() === "") {
                resultsList.innerHTML = "";
                resultsContainer.style.display = "none";
            }
        });
    }
});

// --- Song Page Player Logic (Simplified for Static Embedding) ---
// This logic assumes song details (src, title, artist, image) 
// might be embedded directly in the song.html page or passed via URL parameters 
// in a non-JSON way, or the player is controlled directly from album pages.
// For now, it just sets up basic player controls if they exist.

document.addEventListener("DOMContentLoaded", () => {
    // Only run if player elements exist on the current page (likely song.html)
    const audioPlayer = document.getElementById("audio-player");
    const playPauseBtn = document.getElementById("play-pause-btn"); // Assuming ID is play-pause-btn
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const likeBtn = document.getElementById("like-btn"); // Assuming ID is like-btn
    const volumeBar = document.getElementById("volume-bar");
    const seekBar = document.getElementById("seek-bar");

    if (audioPlayer && playPauseBtn && seekBar) { // Check for essential elements
        console.log("Initializing basic player controls.");

        // Play/Pause functionality
        playPauseBtn.addEventListener("click", () => {
            if (audioPlayer.paused || audioPlayer.ended) {
                audioPlayer.play().catch(e => console.error("Error playing audio:", e));
            } else {
                audioPlayer.pause();
            }
        });

        audioPlayer.addEventListener("play", () => {
            const icon = playPauseBtn.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-play");
                icon.classList.add("fa-pause");
            }
            playPauseBtn.title = "Pause";
        });

        audioPlayer.addEventListener("pause", () => {
            const icon = playPauseBtn.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-pause");
                icon.classList.add("fa-play");
            }
            playPauseBtn.title = "Play";
        });

        // Seek bar functionality
        audioPlayer.addEventListener("loadedmetadata", () => {
            if (isFinite(audioPlayer.duration)) {
                 seekBar.max = audioPlayer.duration;
            }
        });

        audioPlayer.addEventListener("timeupdate", () => {
            if (isFinite(audioPlayer.currentTime)) {
                seekBar.value = audioPlayer.currentTime;
            }
        });

        // Handle NaN on initial load or if duration is not available
        audioPlayer.addEventListener("durationchange", () => {
             if (isFinite(audioPlayer.duration)) {
                 seekBar.max = audioPlayer.duration;
             } else {
                 seekBar.max = 0; // Or some default max
             }
        });

        seekBar.addEventListener("input", () => {
             if (isFinite(seekBar.value)) {
                audioPlayer.currentTime = seekBar.value;
             }
        });

        // Volume control
        if (volumeBar) {
            volumeBar.addEventListener("input", () => {
                audioPlayer.volume = volumeBar.value;
            });
            // Set initial volume display based on audio element
            volumeBar.value = audioPlayer.volume;
        }

        // Like button toggle (visual only)
        if (likeBtn) {
            likeBtn.addEventListener("click", () => {
                likeBtn.classList.toggle("active");
                const icon = likeBtn.querySelector("i");
                 if (likeBtn.classList.contains("active")) {
                    icon.classList.remove("far");
                    icon.classList.add("fas");
                    likeBtn.title = "Unlike";
                } else {
                    icon.classList.remove("fas");
                    icon.classList.add("far");
                    likeBtn.title = "Like";
                }
            });
        }

        // Prev/Next button functionality - Needs context from the album page
        // These buttons likely won't work correctly without knowing the album's song list.
        // They might need to be removed or their logic handled differently.
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                console.warn("Previous button clicked - requires album context");
                alert("Previous button functionality needs implementation based on album context.");
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                console.warn("Next button clicked - requires album context");
                alert("Next button functionality needs implementation based on album context.");
            });
        }
    } else {
        // console.log("Player elements not found on this page.");
    }
});

// --- Comment Section Logic (Placeholder) ---
document.addEventListener("DOMContentLoaded", () => {
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentsList = document.getElementById("comments-list");

    if (commentForm && commentInput && commentsList) {
        commentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const commentText = commentInput.value.trim();
            if (commentText) {
                // Add the new comment to the list (basic example)
                const newComment = document.createElement("li");
                newComment.innerHTML = `
                    <p><strong>User</strong> (Just now)</p>
                    <p>${commentText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p> 
                `; // Basic sanitization
                commentsList.appendChild(newComment);
                commentInput.value = ""; // Clear input
                console.log("Comment added:", commentText);
            } else {
                alert("Please enter a comment.");
            }
        });
    }
});
