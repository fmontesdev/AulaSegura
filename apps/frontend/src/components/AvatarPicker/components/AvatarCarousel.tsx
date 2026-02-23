import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { useAppTheme } from '../../../theme';
import { addOpacity } from '../../../utils/colorUtils';
import { styles } from './AvatarCarousel.styles';

interface AvatarCarouselProps {
  avatars: string[];
  selectedAvatar: string;
  onSelectAvatar: (avatar: string) => void;
  itemsPerPage?: number;
  disabled?: boolean;
  imageBaseUrl: string;
}

export function AvatarCarousel({
  avatars,
  selectedAvatar,
  onSelectAvatar,
  itemsPerPage = 3,
  disabled = false,
  imageBaseUrl,
}: AvatarCarouselProps) {
  const theme = useAppTheme();
  const carouselRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(350);

  const totalPages = Math.ceil(avatars.length / itemsPerPage);
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  return (
    <View style={styles.container}>
      {/* Header con controles de navegación */}
      <View style={styles.sectionHeaderRow}>
        <Text variant="labelMedium" style={{ color: theme.colors.grey }}>
          Predefinidos
        </Text>
        <View style={styles.carouselControls}>
          <IconButton
            icon="chevron-left"
            size={25}
            iconColor={canGoPrev ? theme.colors.secondary : theme.colors.surfaceDisabled}
            disabled={!canGoPrev}
            onPress={() => carouselRef.current?.prev()}
            style={styles.carouselButton}
            rippleColor={addOpacity(theme.colors.secondary, 0.2)}
          />
          <Text variant="labelSmall" style={{ color: theme.colors.grey }}>
            {currentPage + 1} / {totalPages}
          </Text>
          <IconButton
            icon="chevron-right"
            size={25}
            iconColor={canGoNext ? theme.colors.secondary : theme.colors.surfaceDisabled}
            disabled={!canGoNext}
            onPress={() => carouselRef.current?.next()}
            style={styles.carouselButton}
            rippleColor={addOpacity(theme.colors.secondary, 0.2)}
          />
        </View>
      </View>

      {/* Carrusel */}
      <View 
        style={styles.carouselContainer}
        onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
      >
        <Carousel
          ref={carouselRef}
          width={containerWidth}
          height={93}
          data={Array.from({ length: totalPages }, (_, i) => i)}
          onSnapToItem={(index) => setCurrentPage(index)}
          renderItem={({ index }) => {
            const start = index * itemsPerPage;
            const end = start + itemsPerPage;
            const pageAvatars = avatars.slice(start, end);

            return (
              <View style={styles.carouselPage}>
                {pageAvatars.map((avatar) => {
                  const isSelected = selectedAvatar === avatar;
                  const imageSource = { uri: `${imageBaseUrl}/${avatar}` };

                  return (
                    <TouchableOpacity
                      key={avatar}
                      style={[
                        styles.avatarOption,
                        isSelected && [styles.avatarSelected, { borderColor: theme.colors.tertiary }],
                      ]}
                      onPress={() => onSelectAvatar(avatar)}
                      activeOpacity={0.7}
                      disabled={disabled}
                    >
                      <Image source={imageSource} style={styles.avatarImage} />
                      {isSelected && (
                        <View style={[styles.checkmark, { backgroundColor: theme.colors.tertiary }]}>
                          <Text style={[styles.checkmarkText, { color: theme.colors.onTertiary }]}>✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1.0,
            parallaxScrollingOffset: 37,
          }}
          enabled={!disabled}
        />
      </View>
    </View>
  );
}
