// 예시용, 실제 서비스 시 본인 키로 교체!
export const KAKAO_JAVASCRIPT_KEY = "YOUR_KAKAO_JS_KEY";

export function initKakao() {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
  }
}

export function kakaoLogin() {
  if (!window.Kakao) {
    alert('카카오 SDK가 로드되지 않았습니다.');
    return;
  }
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
  }
  window.Kakao.Auth.login({
    success: function (authObj) {
      alert("카카오 로그인 성공! " + JSON.stringify(authObj));
    },
    fail: function (err) {
      alert("카카오 로그인 실패: " + JSON.stringify(err));
    },
  });
} 