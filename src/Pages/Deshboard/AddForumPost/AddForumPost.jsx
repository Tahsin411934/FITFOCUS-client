import { useForm } from 'react-hook-form';
import { axiosSecure } from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import UseAuth from '../../../Hook/useAuth';

function AddForumPost() {
    const { user } = UseAuth();
    console.log(user)
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        axiosSecure.post('/forumPost', data)
            .then(response => {
                const responseData = response.data;
                if (responseData.error) {
                    Swal.fire({
                        title: 'Error!',
                        text: responseData.error,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Added successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                }
            })
    };

    useEffect(() => {
        if (user) {
            setValue('totalUpvote', 0);
            setValue('postOwner', user.displayName || '');
            setValue('postOwnerimage', user.photoURL || '');
            setValue('postTime', new Date().toISOString());
        }
    }, [setValue, user]);

    return (
        <div className="lg:w-[50%]  shadow-lg mx-auto mt-10 p-5 bg-slate-100 ">
            <h1 className='text-2xl font-Prata font-bold text-center p-5'>Add New Forum Post</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Post Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Post Title"
                        className="input input-bordered"
                        {...register('postTitle', { required: true })}
                    />
                    {errors.postTitle && (
                        <p className="text-red-500 ml-1">Post Title is required.</p>
                    )}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Post Image URL</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Post Image URL"
                        className="input input-bordered"
                        {...register('postImage', { required: true })}
                    />
                    {errors.postImage && (
                        <p className="text-red-500 ml-1">Post Image URL is required.</p>
                    )}
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Post Content</span>
                    </label>
                    <textarea
                        placeholder="Post Content"
                        className="input input-bordered h-40"
                        {...register('postContent', { required: true })}
                    ></textarea>
                    {errors.postContent && (
                        <p className="text-red-500 ml-1">Post Content is required.</p>
                    )}
                </div>

                <div className='flex items-center'>
                    <button type="submit" className="btn mx-auto w-36 btn-primary mt-4">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddForumPost;