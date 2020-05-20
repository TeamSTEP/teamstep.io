export interface ProjectProfile {
    title: string;
    description: string;
    logo: string; // image location
    screenshot: string[]; // image location
    projectLink?: string;
}

export interface MemberProfile {
    name: string;
    role: string[];
    profileImage: string; // image location
    bio: string;
    otherInfo?: string;
}
