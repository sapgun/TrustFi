// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TrustScoreNFT
 * @dev Trust Score 기반 NFT 민팅 및 티어 관리
 */
contract TrustScoreNFT is ERC721, Ownable {
    enum Tier {
        NONE,
        BRONZE,
        SILVER,
        GOLD,
        PLATINUM
    }

    struct TrustNFT {
        uint256 trustScore;
        Tier tier;
        uint256 mintedAt;
        uint256 lastUpdated;
    }

    mapping(uint256 => TrustNFT) public trustNFTs;
    mapping(address => uint256) public userTokenId;
    uint256 private _tokenIdCounter;

    string private _baseTokenURI;

    event NFTMinted(address indexed user, uint256 tokenId, Tier tier, uint256 trustScore);
    event TierUpdated(uint256 indexed tokenId, Tier oldTier, Tier newTier, uint256 newScore);

    constructor() ERC721("TrustFi Score NFT", "TRUST") Ownable(msg.sender) {
        _baseTokenURI = "https://trustfi.app/api/nft/metadata/";
    }

    /**
     * @dev Trust Score에 따라 NFT 민팅
     */
    function mintTrustNFT(address to, uint256 trustScore) external onlyOwner returns (uint256) {
        require(userTokenId[to] == 0, "User already has a Trust NFT");
        require(trustScore >= 20, "Trust Score too low to mint");

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        _safeMint(to, tokenId);
        userTokenId[to] = tokenId;

        Tier tier = calculateTier(trustScore);
        trustNFTs[tokenId] = TrustNFT({
            trustScore: trustScore,
            tier: tier,
            mintedAt: block.timestamp,
            lastUpdated: block.timestamp
        });

        emit NFTMinted(to, tokenId, tier, trustScore);
        return tokenId;
    }

    /**
     * @dev Trust Score 업데이트 및 티어 재계산
     */
    function updateTrustScore(uint256 tokenId, uint256 newScore) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");

        TrustNFT storage nft = trustNFTs[tokenId];
        Tier oldTier = nft.tier;
        Tier newTier = calculateTier(newScore);

        nft.trustScore = newScore;
        nft.tier = newTier;
        nft.lastUpdated = block.timestamp;

        emit TierUpdated(tokenId, oldTier, newTier, newScore);
    }

    /**
     * @dev Trust Score에 따른 티어 계산
     */
    function calculateTier(uint256 score) public pure returns (Tier) {
        if (score >= 80) return Tier.PLATINUM;
        if (score >= 60) return Tier.GOLD;
        if (score >= 40) return Tier.SILVER;
        if (score >= 20) return Tier.BRONZE;
        return Tier.NONE;
    }

    /**
     * @dev 사용자의 Trust NFT 정보 조회
     */
    function getUserTrustNFT(address user) external view returns (
        uint256 tokenId,
        uint256 trustScore,
        Tier tier,
        uint256 mintedAt,
        uint256 lastUpdated
    ) {
        tokenId = userTokenId[user];
        require(tokenId != 0, "User does not have a Trust NFT");

        TrustNFT memory nft = trustNFTs[tokenId];
        return (tokenId, nft.trustScore, nft.tier, nft.mintedAt, nft.lastUpdated);
    }

    /**
     * @dev 티어 이름 반환
     */
    function getTierName(Tier tier) public pure returns (string memory) {
        if (tier == Tier.PLATINUM) return "Platinum";
        if (tier == Tier.GOLD) return "Gold";
        if (tier == Tier.SILVER) return "Silver";
        if (tier == Tier.BRONZE) return "Bronze";
        return "None";
    }

    /**
     * @dev Base URI 설정
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev Token URI 반환
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return string(abi.encodePacked(_baseTokenURI, Strings.toString(tokenId)));
    }

    /**
     * @dev NFT 전송 불가 (Soulbound)
     */
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("Trust NFT is soulbound and cannot be transferred");
        }
        return super._update(to, tokenId, auth);
    }
}
