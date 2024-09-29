
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom'

type Props = {
    id: string,
    linkPath: string;
    title: string;
    icon: IconType;
}

function ProfileDropdownButton({id, linkPath, title, icon}: Props) {
    // Reassign to use as JSX element
    const Icon = icon;

    return (
    <Link id={id} to={linkPath} >
        <button id={id} className="w-full rounded border-b-2 border-gray-300 py-2 hover:bg-gray-200 md:px-6">
        <div className="flex items-center justify-center text-sm md:text-base">
            <Icon size={20} />
            <span className="ml-2">{title}</span>
        </div>
        </button>
    </Link>
  )
}

export default ProfileDropdownButton