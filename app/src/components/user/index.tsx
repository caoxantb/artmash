import { component$, $, useStore } from "@builder.io/qwik";
import { createGallery } from "~/services/gallery";
import { useNavigate } from "@builder.io/qwik-city";
import {
  StyledAuth,
  AuthType,
  StyledForm,
  FormLabel,
  FormInput,
  FormButton,
} from "../styled/auth.css";

const GalleryForm = component$(() => {
  const store: any = useStore({
    spaceId: "",
    accessToken: "",
    contentTypeGalleryId: "",
    contentTypeFilmsId: "",
    environmentId: "",
  });
    const nav = useNavigate()

  const handleChange = $((e: any) => {
    const cloneStore = {
      ...store,
      [e.target.name]: e.target.value,
    };

    store.spaceId = cloneStore.spaceId;
    store.accessToken = cloneStore.accessToken;
    store.contentTypeGalleryId = cloneStore.contentTypeGalleryId;
    store.contentTypeFilmsId = cloneStore.contentTypeFilmsId;
    store.environmentId = cloneStore.environmentId;
  });

  const handleSubmit = $(async () => {
    const {
      spaceId,
      accessToken,
      contentTypeGalleryId,
      contentTypeFilmsId,
      environmentId,
    } = store;
    const gallery = await createGallery(
      spaceId,
      accessToken,
      contentTypeGalleryId,
      contentTypeFilmsId,
      environmentId
    );
    nav(`/${gallery._id}`)
  });

  return (
    <StyledAuth>
      <AuthType>CREATE GALLERY</AuthType>
      <StyledForm preventdefault:submit onSubmit$={handleSubmit}>
        <FormLabel>Space ID</FormLabel>
        <FormInput
          type="text"
          name="spaceId"
          id="spaceId"
          placeholder="Space ID"
          onChange$={handleChange}
        />
        <FormLabel>Access Token</FormLabel>
        <FormInput
          type="password"
          name="accessToken"
          id="accessToken"
          placeholder="Access Token"
          onChange$={handleChange}
        />
        <FormLabel>Environment ID</FormLabel>
        <FormInput
          type="text"
          name="environmentId"
          id="environmentId"
          placeholder="Environment ID"
          onChange$={handleChange}
        />
        <FormLabel>Gallery ID</FormLabel>
        <FormInput
          type="text"
          name="contentTypeGalleryId"
          id="contentTypeGalleryId"
          placeholder="Gallery ID"
          onChange$={handleChange}
        />
        <FormLabel>Films ID</FormLabel>
        <FormInput
          type="text"
          name="contentTypeFilmsId"
          id="contentTypeFilmsId"
          placeholder="Films ID"
          onChange$={handleChange}
        />
        <FormButton type="submit">Create Gallery</FormButton>
      </StyledForm>
    </StyledAuth>
  );
});

export default GalleryForm;
