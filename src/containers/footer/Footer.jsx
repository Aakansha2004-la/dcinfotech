import Logo from "../../components/Logo";

const Footer = () => {
    return (
        <footer class="rounded-lg shadow dark:bg-gray-900 m-4 bottom-0">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <Logo />
                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-white">
                        <li>
                            <a href="#" class="mr-4 hover:underline md:mr-6 ">Home</a>
                        </li>
                        <li>
                            <a href="#trending_course" class="mr-4 hover:underline md:mr-6">Course</a>
                        </li>
                        <li>
                            <a href="#about" class="mr-4 hover:underline md:mr-6 ">About</a>
                        </li>
                        <li>
                            <a href="#contact" class="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-black lg:my-8" />
                <span class="block text-sm text-white sm:text-center dark:text-white">© 2025 <a href="https://github.com/Aakansha2004-la" class="hover:underline">Aakansha Pillai</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;